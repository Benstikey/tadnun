import { createClient } from "@supabase/supabase-js";
import { ENV } from "./config";

const sb = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_KEY);

async function main() {
  // Get all pending/scheduled emails
  const { data: pending } = await sb
    .from("sequence_emails")
    .select("id, status, step, scheduled_for, subject, prospect_id, prospects(name, email)")
    .in("status", ["pending", "scheduled"])
    .order("scheduled_for", { ascending: true });

  console.log(`Total pending/scheduled: ${pending?.length}\n`);

  // Group by status and check timing
  const now = new Date();
  let overdue = 0;
  let future = 0;

  for (const e of pending ?? []) {
    const p = Array.isArray(e.prospects) ? e.prospects[0] : e.prospects;
    const pEmail = (p as { email: string })?.email ?? "no email";
    const pName = (p as { name: string })?.name ?? "?";
    const scheduledFor = new Date(e.scheduled_for);
    const isPast = scheduledFor < now;

    if (isPast) overdue++;
    else future++;

    const icon = isPast ? "OVERDUE" : "FUTURE ";
    console.log(`${icon} | ${e.status.padEnd(9)} | Step ${e.step} | ${e.scheduled_for} | ${pEmail} | ${pName}`);
  }

  console.log(`\n--- Summary ---`);
  console.log(`Overdue (should have sent): ${overdue}`);
  console.log(`Future (not yet due): ${future}`);

  // Check status distribution
  const { data: all } = await sb.from("sequence_emails").select("status");
  const statuses: Record<string, number> = {};
  all?.forEach((e) => { statuses[e.status] = (statuses[e.status] || 0) + 1; });
  console.log(`\nAll statuses:`, statuses);
}

main().catch(console.error);
