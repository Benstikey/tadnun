// ============================================================
// Bulk Email Verification via Abstract Email Reputation API
// ============================================================
// Checks all prospect emails and removes invalid ones.
//
// Usage: npx tsx scripts/outbound/verify-all.ts

import { createClient } from "@supabase/supabase-js";
import { ENV } from "./config";

const API_KEY = ENV.ABSTRACT_API_KEY;
const RESEND_KEY = process.env.RESEND_FULL_ACCESS_KEY ?? "";
const DELAY_MS = 1200; // ~1.2s between calls to stay under rate limits

const sb = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_KEY);

interface ReputationResult {
  email_deliverability: {
    status: string;
    status_detail: string;
    is_smtp_valid: boolean;
    is_mx_valid: boolean;
  };
  email_quality: {
    score: number;
    is_disposable: boolean;
    is_catchall: boolean;
  };
  email_risk: {
    address_risk_status: string;
    domain_risk_status: string;
  };
}

async function checkEmail(email: string): Promise<ReputationResult | null> {
  const url = `https://emailreputation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.log(`  API error: ${res.status} ${res.statusText}`);
    return null;
  }
  return res.json() as Promise<ReputationResult>;
}

async function checkResendStatus(resendId: string): Promise<string | null> {
  if (!RESEND_KEY) return null;
  try {
    const res = await fetch(`https://api.resend.com/emails/${resendId}`, {
      headers: { Authorization: `Bearer ${RESEND_KEY}` },
    });
    if (!res.ok) return null;
    const data = await res.json() as { last_event?: string };
    return data.last_event ?? null;
  } catch {
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  // Get all prospects with emails
  const { data: prospects, error } = await sb
    .from("prospects")
    .select("id, name, email, sector, city, status")
    .not("email", "is", null)
    .neq("email", "");

  if (error || !prospects) {
    console.error("Failed to fetch prospects:", error);
    return;
  }

  console.log(`\nVerifying ${prospects.length} emails via Abstract Email Reputation API...\n`);

  const results = {
    valid: [] as string[],
    invalid: [] as string[],
    risky: [] as string[],
    error: [] as string[],
  };

  for (let i = 0; i < prospects.length; i++) {
    const p = prospects[i];
    const progress = `[${i + 1}/${prospects.length}]`;

    try {
      const result = await checkEmail(p.email);
      if (!result) {
        results.error.push(p.email);
        console.log(`${progress} ?? ERROR   ${p.email} (${p.name})`);
        await sleep(DELAY_MS);
        continue;
      }

      const status = result.email_deliverability.status;
      const smtpValid = result.email_deliverability.is_smtp_valid;
      const score = Math.round((result.email_quality?.score ?? 0) * 100);
      const risk = result.email_risk?.address_risk_status;

      if (status === "undeliverable" || (!smtpValid && status !== "unknown")) {
        results.invalid.push(p.email);
        console.log(`${progress} X  INVALID  ${p.email} | ${status} | smtp:${smtpValid} | score:${score} | ${p.name}`);

        // Remove email, reset status, cancel pending sequences
        await sb.from("prospects").update({ email: null, status: "scored" }).eq("id", p.id);
        await sb.from("sequence_emails").update({ status: "cancelled" }).eq("prospect_id", p.id).in("status", ["scheduled", "pending"]);
        console.log(`         -> Removed email, cancelled pending sequences`);
      } else if (risk === "high" || score < 40) {
        results.risky.push(p.email);
        console.log(`${progress} !  RISKY    ${p.email} | ${status} | risk:${risk} | score:${score} | ${p.name}`);
      } else {
        results.valid.push(p.email);
        console.log(`${progress} OK VALID    ${p.email} | ${status} | score:${score} | ${p.name}`);
      }
    } catch (e) {
      results.error.push(p.email);
      console.log(`${progress} ?? ERROR   ${p.email}: ${e}`);
    }

    await sleep(DELAY_MS);
  }

  // Also check Resend delivery status for sent emails
  if (RESEND_KEY) {
    console.log("\n--- Checking Resend delivery status for sent emails ---\n");
    const { data: sentEmails } = await sb
      .from("sequence_emails")
      .select("id, resend_id, prospect_id, prospects(name, email)")
      .eq("status", "sent")
      .not("resend_id", "is", null)
      .is("bounced_at", null);

    let resendBounced = 0;
    for (const email of sentEmails ?? []) {
      const event = await checkResendStatus(email.resend_id);
      const p = Array.isArray(email.prospects) ? email.prospects[0] : email.prospects;
      const pEmail = (p as { email: string })?.email ?? "?";

      if (event === "bounced") {
        resendBounced++;
        console.log(`X  BOUNCED  ${pEmail} (via Resend)`);
        await sb.from("sequence_emails").update({ bounced_at: new Date().toISOString() }).eq("id", email.id);
        await sb.from("prospects").update({ email: null, status: "scored" }).eq("id", email.prospect_id);
        await sb.from("sequence_emails").update({ status: "cancelled" }).eq("prospect_id", email.prospect_id).in("status", ["scheduled", "pending"]);
      }
      await sleep(150);
    }
    if (resendBounced > 0) console.log(`\nFound ${resendBounced} additional bounces via Resend.`);
  }

  // Summary
  console.log("\n" + "=".repeat(50));
  console.log("VERIFICATION SUMMARY");
  console.log("=".repeat(50));
  console.log(`OK Valid:   ${results.valid.length}`);
  console.log(`!  Risky:   ${results.risky.length}`);
  console.log(`X  Invalid: ${results.invalid.length}`);
  console.log(`?? Error:   ${results.error.length}`);

  if (results.invalid.length > 0) {
    console.log("\nRemoved invalid emails:");
    results.invalid.forEach((e) => console.log(`  - ${e}`));
  }
  if (results.risky.length > 0) {
    console.log("\nRisky emails (monitor closely):");
    results.risky.forEach((e) => console.log(`  - ${e}`));
  }
}

main().catch(console.error);
