"use server";

import { createClient } from "@/lib/supabase-server";
import { Resend } from "resend";

export async function resendEmail(emailId: number) {
  const supabase = await createClient();

  const { data: email } = await supabase
    .from("sequence_emails")
    .select("*, prospects(email, name)")
    .eq("id", emailId)
    .single();

  if (!email) return { error: "Email not found" };

  const prospect = Array.isArray(email.prospects) ? email.prospects[0] : email.prospects;
  if (!prospect?.email) return { error: "No recipient email" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No API key — just re-queue for the cron worker
    await supabase.from("sequence_emails").update({ status: "pending", sent_at: null }).eq("id", emailId);
    return { ok: true, queued: true };
  }

  const resend = new Resend(apiKey);
  const result = await resend.emails.send({
    from: `${process.env.OUTBOUND_SENDER_NAME ?? "Wassim — Tadnun"} <${process.env.OUTBOUND_SENDER_EMAIL ?? "wassim@tadnun.com"}>`,
    to: [prospect.email],
    subject: email.subject,
    html: email.body_html,
    replyTo: "wassimbenchekroun0@gmail.com",
  });

  if (result.data?.id) {
    await supabase.from("sequence_emails").update({
      status: "sent",
      sent_at: new Date().toISOString(),
      resend_id: result.data.id,
    }).eq("id", emailId);
    return { ok: true };
  }

  return { error: result.error?.message ?? "Send failed" };
}

export async function cancelEmail(emailId: number) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("sequence_emails")
    .update({ status: "cancelled" })
    .eq("id", emailId)
    .eq("status", "pending");

  if (error) return { error: error.message };
  return { ok: true };
}

export async function composeEmail(data: {
  prospect_id: number;
  subject: string;
  body_html: string;
  send_now: boolean;
  scheduled_for?: string;
}) {
  const supabase = await createClient();

  const { data: prospect } = await supabase
    .from("prospects")
    .select("email, name")
    .eq("id", data.prospect_id)
    .single();

  if (!prospect?.email) return { error: "Prospect has no email" };

  const scheduledFor = data.send_now
    ? new Date().toISOString()
    : data.scheduled_for ?? new Date().toISOString();

  // Insert into DB
  const { data: row, error } = await supabase.from("sequence_emails").insert({
    prospect_id: data.prospect_id,
    step: 0,
    template_key: "ad_hoc",
    subject: data.subject,
    body_html: data.body_html,
    scheduled_for: scheduledFor,
    status: data.send_now ? "pending" : "pending",
  }).select("id").single();

  if (error) return { error: error.message };

  // Send immediately if requested
  if (data.send_now) {
    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const resend = new Resend(apiKey);
      const result = await resend.emails.send({
        from: `${process.env.OUTBOUND_SENDER_NAME ?? "Wassim — Tadnun"} <${process.env.OUTBOUND_SENDER_EMAIL ?? "wassim@tadnun.com"}>`,
        to: [prospect.email],
        subject: data.subject,
        html: data.body_html,
      });

      if (result.data?.id) {
        await supabase.from("sequence_emails").update({
          status: "sent",
          sent_at: new Date().toISOString(),
          resend_id: result.data.id,
        }).eq("id", row!.id);
      }
    }
  }

  return { ok: true };
}
