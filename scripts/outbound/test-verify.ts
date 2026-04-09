import { createClient } from "@supabase/supabase-js";
import { ENV } from "./config";

const sb = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_KEY);

async function main() {
  // 1. Test Abstract API
  const testEmail = "benstikey@gmail.com";
  const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${ENV.ABSTRACT_API_KEY}&email=${encodeURIComponent(testEmail)}`;
  console.log("API Key length:", ENV.ABSTRACT_API_KEY.length);
  console.log("Testing Abstract API with:", testEmail);

  try {
    const res = await fetch(url);
    console.log("Status:", res.status);
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (e) {
    console.log("Abstract API error:", e);
  }

  // 2. Get bounced emails
  const { data: bounced } = await sb
    .from("sequence_emails")
    .select("prospect_id, to_email, subject, bounced_at")
    .not("bounced_at", "is", null);
  console.log("\n=== BOUNCED EMAILS ===");
  console.log(JSON.stringify(bounced, null, 2));

  // 3. Get all prospects with emails
  const { data: prospects } = await sb
    .from("prospects")
    .select("id, name, email, sector, city, status")
    .not("email", "is", null)
    .neq("email", "");
  console.log("\n=== ALL PROSPECTS WITH EMAILS ===");
  console.log("Count:", prospects?.length);
  prospects?.forEach((p) =>
    console.log(`  ${p.email} | ${p.name} | ${p.sector} | ${p.status}`)
  );
}

main().catch(console.error);
