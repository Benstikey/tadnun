// ============================================================
// Outbound GTM Automation — Email Verifier
// ============================================================
// Uses Abstract Email Reputation API for real SMTP verification,
// with local checks as pre-filter to save API quota (100/month).

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
  score?: number; // 0-100 deliverability
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
 * Abstract Email Reputation API (real SMTP check from their servers).
 * Free tier: 100/month.
 */
async function abstractReputationCheck(email: string): Promise<VerifyResult> {
  const apiKey = ENV.ABSTRACT_API_KEY;
  if (!apiKey) {
    return { valid: true, reason: "api key not set, mx valid" };
  }

  try {
    const url = `https://emailreputation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`  Abstract API error: ${res.status}`);
      return { valid: true, reason: `api error ${res.status}, assumed valid` };
    }

    const data = await res.json() as {
      email_address: string;
      email_deliverability: {
        status: string; // deliverable, undeliverable, risky, unknown
        status_detail: string;
        is_smtp_valid: boolean;
        is_mx_valid: boolean;
      };
      email_quality: {
        score: number; // 0.01 - 0.99
        is_disposable: boolean;
        is_catchall: boolean;
        is_free_email: boolean;
        is_role: boolean;
      };
      email_risk: {
        address_risk_status: string; // low, medium, high
        domain_risk_status: string;
      };
    };

    const score = Math.round((data.email_quality?.score ?? 0) * 100);
    const deliverability = data.email_deliverability?.status;

    if (deliverability === "undeliverable") {
      return { valid: false, reason: "undeliverable (SMTP check failed)", score };
    }
    if (!data.email_deliverability?.is_smtp_valid && deliverability !== "unknown") {
      return { valid: false, reason: "SMTP invalid", score };
    }
    if (data.email_quality?.is_disposable) {
      return { valid: false, reason: "disposable email", score };
    }
    if (data.email_risk?.address_risk_status === "high") {
      return { valid: false, reason: "high risk address", score };
    }
    if (score < 40) {
      return { valid: false, reason: `low quality score (${score})`, score };
    }
    if (data.email_quality?.is_catchall) {
      return { valid: true, reason: "catch-all domain", score };
    }

    return { valid: true, reason: deliverability, score };
  } catch (e) {
    console.log(`  Abstract API timeout: ${e}`);
    return { valid: true, reason: "api timeout, assumed valid" };
  }
}

/**
 * Full email verification pipeline:
 * 1. Local syntax/blacklist checks (free, instant)
 * 2. MX record lookup (free, fast)
 * 3. Abstract Email Reputation API (100 free/month, real SMTP from their servers)
 */
export async function verifyEmail(email: string): Promise<VerifyResult> {
  // Step 1: Local pre-filter
  const local = localCheck(email);
  if (local) return local;

  const domain = email.split("@")[1].toLowerCase();

  // Step 2: MX check
  const hasMx = await checkMx(domain);
  if (!hasMx) return { valid: false, reason: "no MX records" };

  // Step 3: Abstract Email Reputation (real SMTP + deliverability)
  const api = await abstractReputationCheck(email);
  return api;
}
