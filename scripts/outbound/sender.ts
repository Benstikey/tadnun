// ============================================================
// Outbound GTM Automation — Email Sender (Resend)
// ============================================================

import { Resend } from "resend";
import { ENV, MAX_DAILY_EMAILS, EMAIL_SEND_DELAY_MS } from "./config";
import {
  getDueEmails,
  markEmailSent,
  markEmailFailed,
  logActivity,
} from "./db";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Send all due emails via Resend. Called by cron scheduler.
 */
export async function runSender(): Promise<{ sent: number; failed: number }> {
  if (!ENV.RESEND_API_KEY) {
    console.warn("[sender] RESEND_API_KEY not set — skipping");
    return { sent: 0, failed: 0 };
  }

  const resend = new Resend(ENV.RESEND_API_KEY);
  const dueEmails = await getDueEmails();
  const batch = dueEmails.slice(0, MAX_DAILY_EMAILS);

  console.log(`\n[sender] ${batch.length} emails due to send...`);

  let sent = 0;
  let failed = 0;

  for (const email of batch) {
    try {
      const result = await resend.emails.send({
        from: `${ENV.SENDER_NAME} <${ENV.SENDER_EMAIL}>`,
        to: [email.prospect_email],
        subject: email.subject,
        html: email.body_html,
        headers: {
          "X-Entity-Ref-ID": `tadnun-outbound-${email.id}`,
        },
      });

      if (result.data?.id) {
        markEmailSent(email.id, result.data.id);
        sent++;
        console.log(`  ✓ Sent to ${email.prospect_name} (${email.prospect_email}) — step ${email.step}`);
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

  logActivity(null, "sending_complete", `Sent: ${sent}, Failed: ${failed}`);
  console.log(`[sender] Done — ${sent} sent, ${failed} failed\n`);
  return { sent, failed };
}
