// ============================================================
// Outbound GTM Automation — Email Sender (Resend)
// ============================================================
// Sends due emails and verifies delivery after each send.
// If an email bounces, the prospect is cleaned from the pipeline.

import { Resend } from "resend";
import { ENV, MAX_DAILY_EMAILS, EMAIL_SEND_DELAY_MS } from "./config";
import {
  getDueEmails,
  markEmailSent,
  markEmailFailed,
  logActivity,
  getDb,
} from "./db";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const RESEND_FULL_KEY = process.env.RESEND_FULL_ACCESS_KEY ?? "";
const BOUNCE_CHECK_DELAY_MS = 15_000; // Wait 15s then check for bounce

/**
 * Check if an email bounced via Resend full-access API.
 * Returns the last event status or null if can't check.
 */
async function checkResendStatus(resendId: string): Promise<string | null> {
  if (!RESEND_FULL_KEY) return null;
  try {
    const res = await fetch(`https://api.resend.com/emails/${resendId}`, {
      headers: { Authorization: `Bearer ${RESEND_FULL_KEY}` },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { last_event?: string };
    return data.last_event ?? null;
  } catch {
    return null;
  }
}

/**
 * Remove a bounced prospect: clear email, cancel pending sequences.
 */
async function cleanBouncedProspect(prospectId: number, email: string) {
  const db = getDb();
  await db.from("prospects").update({ email: null, status: "scored" }).eq("id", prospectId);
  await db.from("sequence_emails").update({ status: "cancelled" }).eq("prospect_id", prospectId).in("status", ["pending", "scheduled"]);
  console.log(`  ⛔ Bounced — removed ${email} and cancelled future emails`);
}

/**
 * Send all due emails via Resend. After each send, waits and checks
 * for immediate bounces to prevent sending more to bad addresses.
 */
export async function runSender(): Promise<{ sent: number; failed: number; bounced: number }> {
  if (!ENV.RESEND_API_KEY) {
    console.warn("[sender] RESEND_API_KEY not set — skipping");
    return { sent: 0, failed: 0, bounced: 0 };
  }

  const resend = new Resend(ENV.RESEND_API_KEY);
  const dueEmails = await getDueEmails();
  const batch = dueEmails.slice(0, MAX_DAILY_EMAILS);

  console.log(`\n[sender] ${batch.length} emails due to send...`);

  let sent = 0;
  let failed = 0;
  let bounced = 0;
  const bouncedProspects = new Set<number>();

  for (const email of batch) {
    // Skip if this prospect already bounced in this batch
    if (bouncedProspects.has(email.prospect_id)) {
      console.log(`  ⏭ Skipping ${email.prospect_email} (already bounced)`);
      continue;
    }

    try {
      const result = await resend.emails.send({
        from: `${ENV.SENDER_NAME} <${ENV.SENDER_EMAIL}>`,
        to: [email.prospect_email],
        replyTo: ENV.REPLY_TO_EMAIL,
        subject: email.subject,
        html: email.body_html,
        headers: {
          "X-Entity-Ref-ID": `tadnun-outbound-${email.id}`,
          "X-Resend-Track-Opens": "false",
        },
      });

      if (result.data?.id) {
        markEmailSent(email.id, result.data.id);
        sent++;
        console.log(`  ✓ Sent to ${email.prospect_name} (${email.prospect_email}) — step ${email.step}`);

        // Wait and check for immediate bounce
        if (RESEND_FULL_KEY) {
          console.log(`    Verifying delivery (${BOUNCE_CHECK_DELAY_MS / 1000}s)...`);
          await sleep(BOUNCE_CHECK_DELAY_MS);
          const status = await checkResendStatus(result.data.id);

          if (status === "bounced") {
            bounced++;
            sent--; // Don't count as sent
            await getDb()
              .from("sequence_emails")
              .update({ bounced_at: new Date().toISOString(), status: "failed" })
              .eq("id", email.id);
            bouncedProspects.add(email.prospect_id);
            await cleanBouncedProspect(email.prospect_id, email.prospect_email);
          } else {
            console.log(`    ✓ Status: ${status ?? "pending"}`);
          }
        }
      } else {
        markEmailFailed(email.id);
        failed++;
        console.log(`  ✗ Failed: ${email.prospect_name} — ${JSON.stringify(result.error)}`);
      }
    } catch (err) {
      markEmailFailed(email.id);
      failed++;
      console.error(`  ✗ Error sending to ${email.prospect_email}:`, err instanceof Error ? err.message : err);
    }

    await sleep(EMAIL_SEND_DELAY_MS);
  }

  logActivity(null, "sending_complete", `Sent: ${sent}, Failed: ${failed}, Bounced: ${bounced}`);
  console.log(`[sender] Done — ${sent} sent, ${failed} failed, ${bounced} bounced\n`);
  return { sent, failed, bounced };
}
