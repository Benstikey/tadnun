import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const RESEND_KEY = process.env.RESEND_FULL_ACCESS_KEY!;
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const SUSPECT_EMAILS = [
  "contact@reftagri.ma",
  "gabriele.meletti@timesisafrique.com",
  "contact@nectusbio.com",
];

async function main() {
  for (const email of SUSPECT_EMAILS) {
    // Find all sequence_emails sent to this prospect
    const { data: prospect } = await sb
      .from("prospects")
      .select("id, name, email")
      .eq("email", email)
      .single();

    if (!prospect) {
      console.log(`\n${email} — prospect not found`);
      continue;
    }

    const { data: seqs } = await sb
      .from("sequence_emails")
      .select("id, step, status, resend_id, sent_at, bounced_at")
      .eq("prospect_id", prospect.id)
      .order("step");

    console.log(`\n=== ${email} (${prospect.name}) ===`);
    for (const s of seqs ?? []) {
      let resendStatus = "n/a";
      if (s.resend_id) {
        const res = await fetch(`https://api.resend.com/emails/${s.resend_id}`, {
          headers: { Authorization: `Bearer ${RESEND_KEY}` },
        });
        const data = await res.json() as { last_event?: string };
        resendStatus = data.last_event ?? "unknown";
      }
      console.log(`  Step ${s.step} | DB: ${s.status.padEnd(9)} | Resend: ${resendStatus.padEnd(10)} | resend_id: ${s.resend_id ?? "none"}`);
    }
  }
}

main().catch(console.error);
