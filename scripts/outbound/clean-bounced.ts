import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const RESEND_KEY = process.env.RESEND_FULL_ACCESS_KEY!;
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  // Find ALL sent emails, check each via Resend for bounce
  const { data: sent } = await sb
    .from("sequence_emails")
    .select("id, resend_id, prospect_id, step, prospects(name, email)")
    .eq("status", "sent")
    .not("resend_id", "is", null);

  console.log(`Checking ${sent?.length} sent emails...\n`);

  const bouncedProspectIds = new Set<number>();

  for (const e of sent ?? []) {
    const res = await fetch(`https://api.resend.com/emails/${e.resend_id}`, {
      headers: { Authorization: `Bearer ${RESEND_KEY}` },
    });
    const data = await res.json() as { last_event?: string };

    if (data.last_event === "bounced") {
      const p = Array.isArray(e.prospects) ? e.prospects[0] : e.prospects;
      const pEmail = (p as { email: string })?.email ?? "?";
      console.log(`X  ${pEmail} Step ${e.step} — BOUNCED`);

      await sb.from("sequence_emails").update({ bounced_at: new Date().toISOString(), status: "failed" }).eq("id", e.id);
      bouncedProspectIds.add(e.prospect_id);
    }
    await new Promise((r) => setTimeout(r, 150));
  }

  // Clean up bounced prospects
  for (const pid of bouncedProspectIds) {
    await sb.from("prospects").update({ email: null, status: "scored" }).eq("id", pid);
    const { data: cancelled } = await sb
      .from("sequence_emails")
      .select("id")
      .eq("prospect_id", pid)
      .in("status", ["pending", "scheduled"]);
    if (cancelled && cancelled.length > 0) {
      await sb.from("sequence_emails").update({ status: "cancelled" }).eq("prospect_id", pid).in("status", ["pending", "scheduled"]);
      console.log(`   -> Cancelled ${cancelled.length} pending emails`);
    }
  }

  console.log(`\nCleaned ${bouncedProspectIds.size} bounced prospects.`);
}

main().catch(console.error);
