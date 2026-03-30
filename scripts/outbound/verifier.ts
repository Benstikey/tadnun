// ============================================================
// Outbound GTM Automation — Email Verifier
// ============================================================
// Uses Abstract API for real SMTP mailbox verification,
// with local checks as pre-filter to save API quota.

import dns from "dns/promises";
import { ENV } from "./config";

const DISPOSABLE = [
  "mailinator.com", "guerrillamail.com", "tempmail.com", "throwaway.email",
  "yopmail.com", "sharklasers.com", "grr.la", "dispostable.com",
  "trashmail.com", "10minutemail.com",
];

const PLATFORM = [
  "strikingly.com", "wix.com", "squarespace.com", "weebly.com",
  "wordpress.com", "godaddy.com", "jimdo.com",
];

const SUSPICIOUS_GMAIL = [
  /^hotel\./i, /^restaurant\./i, /^cafe\./i, /^riad\./i,
  /^info\./i, /^contact\./i, /^booking\./i, /^reservation\./i,
  /\.contact\.us@/i, /\.info@/i,
];

export interface VerifyResult {
  valid: boolean;
  reason?: string;
  score?: number; // 0-100 deliverability from Abstract API
}

/**
 * Pre-filter with local checks (free, instant). Returns null if passes.
 */
function localCheck(email: string): VerifyResult | null {
  if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return { valid: false, reason: "bad syntax" };
  }
  if (email === "user@domain.com" || email.startsWith("test@") || email.startsWith("admin@example")) {
    return { valid: false, reason: "placeholder email" };
  }
  const domain = email.split("@")[1].toLowerCase();
  if (DISPOSABLE.includes(domain)) return { valid: false, reason: "disposable" };
  if (PLATFORM.includes(domain)) return { valid: false, reason: "platform email" };
  if (domain === "gmail.com" && SUSPICIOUS_GMAIL.some((p) => p.test(email))) {
    return { valid: false, reason: "suspicious gmail pattern" };
  }
  return null; // Passed local checks
}

/**
 * MX record check (free, fast).
 */
async function checkMx(domain: string): Promise<boolean> {
  try {
    const mx = await dns.resolveMx(domain);
    return mx && mx.length > 0;
  } catch {
    return false;
  }
}

/**
 * Abstract API verification (real SMTP check, catch-all detection).
 * Free tier: 100/month. Only call for leads that pass local + MX checks.
 */
async function abstractApiCheck(email: string): Promise<VerifyResult> {
  if (!ENV.ABSTRACT_API_KEY) {
    // No API key — fall back to MX-only
    return { valid: true, reason: "api key not set, mx valid" };
  }

  try {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${ENV.ABSTRACT_API_KEY}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (!res.ok) {
      return { valid: true, reason: "api error, assumed valid" };
    }

    const data = await res.json() as {
      deliverability: string; // DELIVERABLE, UNDELIVERABLE, RISKY, UNKNOWN
      quality_score: number; // 0.01 - 0.99
      is_valid_format: { value: boolean };
      is_disposable_email: { value: boolean };
      is_catchall_email: { value: boolean };
      is_smtp_valid: { value: boolean };
      is_mx_found: { value: boolean };
    };

    const score = Math.round((data.quality_score ?? 0) * 100);

    if (data.deliverability === "UNDELIVERABLE") {
      return { valid: false, reason: "undeliverable (SMTP check failed)", score };
    }
    if (data.is_disposable_email?.value) {
      return { valid: false, reason: "disposable email", score };
    }
    if (!data.is_smtp_valid?.value && data.deliverability !== "UNKNOWN") {
      return { valid: false, reason: "SMTP invalid", score };
    }
    if (score < 40) {
      return { valid: false, reason: `low quality score (${score})`, score };
    }
    if (data.is_catchall_email?.value) {
      // Catch-all domains accept any address — risky but not invalid
      return { valid: true, reason: "catch-all domain", score };
    }

    return { valid: true, score };
  } catch {
    return { valid: true, reason: "api timeout, assumed valid" };
  }
}

/**
 * Full email verification pipeline:
 * 1. Local syntax/blacklist checks (free, instant)
 * 2. MX record lookup (free, fast)
 * 3. Abstract API SMTP verification (100 free/month)
 */
export async function verifyEmail(email: string): Promise<VerifyResult> {
  // Step 1: Local pre-filter
  const local = localCheck(email);
  if (local) return local;

  const domain = email.split("@")[1].toLowerCase();

  // Step 2: MX check
  const hasMx = await checkMx(domain);
  if (!hasMx) return { valid: false, reason: "no MX records" };

  // Step 3: Abstract API (real SMTP + deliverability)
  const api = await abstractApiCheck(email);
  return api;
}
