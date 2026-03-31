import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const TO_EMAIL = "contact@tadnun.com";

// Simple in-memory rate limiter (resets on cold start, good enough for serverless)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

export async function POST(request: Request) {
  try {
    // Rate limit by IP
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, contact, sector, message, website: honeypot, _t } = body;

    // Honeypot check — hidden field should be empty
    if (honeypot) {
      // Bot detected — return fake success
      return NextResponse.json({ success: true });
    }

    // Time check — form must take at least 2 seconds to fill
    if (_t && Date.now() - Number(_t) < 2000) {
      return NextResponse.json({ success: true });
    }

    if (!name || !contact) {
      return NextResponse.json(
        { error: "Name and contact are required" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      await supabase.from("leads").insert({
        name,
        contact,
        sector: sector || null,
        message: message || null,
      });
    }

    // Send email notification via Resend
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Tadnun Contact <onboarding@resend.dev>",
        to: TO_EMAIL,
        subject: `[Tadnun] New lead: ${name}${sector ? ` — ${sector}` : ""}`,
        html: `
          <h2>New contact form submission</h2>
          <table style="border-collapse:collapse;width:100%">
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Name</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Contact</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(contact)}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Sector</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(sector || "Not specified")}</td></tr>
            <tr><td style="padding:8px;border:1px solid #ddd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(message || "—")}</td></tr>
          </table>
          <p style="margin-top:16px;color:#666;font-size:12px">Sent from tadnun.com contact form</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Contact API] Error:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
