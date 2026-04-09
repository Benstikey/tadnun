import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const RESEND_KEY = process.env.RESEND_FULL_ACCESS_KEY ?? process.env.RESEND_API_KEY!;
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  // Check ALL sent emails for bounces
  const { data: emails } = await sb
    .from("sequence_emails")
    .select("id, resend_id, subject, prospect_id, step, prospects(name, email)")
    .eq("status", "sent")
    .not("resend_id", "is", null)
    .is("bounced_at", null);

  console.log(`Checking ${emails?.length} sent emails for bounces...\n`);

  let delivered = 0, bounced = 0, other = 0;

  for (const email of emails ?? []) {
    const p = Array.isArray(email.prospects) ? email.prospects[0] : email.prospects;
    const pEmail = (p as { email: string })?.email ?? "?";
    const pName = (p as { name: string })?.name ?? "?";

    try {
      const res = await fetch(`https://api.resend.com/emails/${email.resend_id}`, {
        headers: { Authorization: `Bearer ${RESEND_KEY}` },
      });
      const data = await res.json() as { last_event?: string };
      const status = data.last_event || "unknown";

      if (status === "bounced") {
        bounced++;
        console.log(`X  BOUNCED  ${pEmail} | Step ${email.step} | ${pName}`);
        // Mark bounced
        await sb.from("sequence_emails").update({ bounced_at: new Date().toISOString(), status: "failed" }).eq("id", email.id);
        // Remove email from prospect
        await sb.from("prospects").update({ email: null, status: "scored" }).eq("id", email.prospect_id);
        // Cancel ALL pending emails for this prospect
        await sb.from("sequence_emails").update({ status: "cancelled" }).eq("prospect_id", email.prospect_id).in("status", ["pending", "scheduled"]);
      } else if (status === "delivered") {
        delivered++;
      } else {
        other++;
        console.log(`?  ${status.padEnd(10)} ${pEmail} | ${pName}`);
      }
      await new Promise((r) => setTimeout(r, 150));
    } catch (e) {
      console.log(`!  ERROR    ${pEmail}: ${e}`);
    }
  }

  console.log(`\n✅ Delivered: ${delivered}  |  ❌ Bounced: ${bounced}  |  ❓ Other: ${other}`);
}

main().catch(console.error);
