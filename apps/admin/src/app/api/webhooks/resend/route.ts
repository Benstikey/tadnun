import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Use service role to bypass RLS — this is a server-to-server webhook
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface ResendWebhookEvent {
  type: string;
  created_at: string;
  data: {
    email_id: string;
    from: string;
    to: string[];
    subject: string;
    created_at: string;
  };
}

export async function POST(request: NextRequest) {
  // Verify webhook secret if configured
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (webhookSecret) {
    const svixId = request.headers.get("svix-id");
    if (!svixId) {
      return NextResponse.json({ error: "Missing svix-id" }, { status: 401 });
    }
  }

  const event = (await request.json()) as ResendWebhookEvent;
  const resendId = event.data.email_id;
  const supabase = getSupabase();

  // Find the email by resend_id
  const { data: email } = await supabase
    .from("sequence_emails")
    .select("id")
    .eq("resend_id", resendId)
    .single();

  if (!email) {
    // Not one of our tracked emails — ignore
    return NextResponse.json({ ok: true, skipped: true });
  }

  const now = new Date().toISOString();

  switch (event.type) {
    case "email.delivered":
      await supabase
        .from("sequence_emails")
        .update({ delivered_at: now })
        .eq("id", email.id);
      break;

    case "email.opened":
      await supabase.rpc("increment_open_count", { email_row_id: email.id });
      await supabase
        .from("sequence_emails")
        .update({ opened_at: now })
        .eq("id", email.id)
        .is("opened_at", null); // Only set first open time
      break;

    case "email.bounced":
      await supabase
        .from("sequence_emails")
        .update({ bounced_at: now, status: "failed" })
        .eq("id", email.id);
      break;

    case "email.complained":
      await supabase
        .from("sequence_emails")
        .update({ complained_at: now, status: "failed" })
        .eq("id", email.id);
      // Also mark the prospect to avoid future emails
      const { data: emailRow } = await supabase
        .from("sequence_emails")
        .select("prospect_id")
        .eq("id", email.id)
        .single();
      if (emailRow) {
        await supabase
          .from("prospects")
          .update({ status: "disqualified", notes: "Spam complaint received" })
          .eq("id", emailRow.prospect_id);
        // Cancel any pending emails for this prospect
        await supabase
          .from("sequence_emails")
          .update({ status: "cancelled" })
          .eq("prospect_id", emailRow.prospect_id)
          .eq("status", "pending");
      }
      break;
  }

  await supabase.from("activity_log").insert({
    prospect_id: null,
    action: `email_${event.type.replace("email.", "")}`,
    details: `resend_id: ${resendId}`,
  });

  return NextResponse.json({ ok: true });
}
