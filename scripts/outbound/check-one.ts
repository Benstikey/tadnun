import path from "path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const RESEND_KEY = process.env.RESEND_API_KEY!;
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function main() {
  // Get one sent email with resend_id
  const { data } = await sb
    .from("sequence_emails")
    .select("id, resend_id, subject")
    .eq("status", "sent")
    .not("resend_id", "is", null)
    .limit(1)
    .single();

  console.log("DB record:", data);
  console.log("\nResend ID:", data?.resend_id);

  const res = await fetch(`https://api.resend.com/emails/${data?.resend_id}`, {
    headers: { Authorization: `Bearer ${RESEND_KEY}` },
  });
  console.log("HTTP status:", res.status);
  const json = await res.json();
  console.log("Full response:", JSON.stringify(json, null, 2));
}

main().catch(console.error);
