// ============================================================
// Outbound GTM Automation — Email Enricher
// ============================================================

import { WEBSITE_SCRAPE_DELAY_MS, ENRICH_BATCH_SIZE } from "./config";
import { verifyEmail } from "./verifier";
import {
  getProspectsToEnrich,
  getProspectsWithoutWebsite,
  updateProspect,
  logActivity,
  type ProspectRow,
} from "./db";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g;

const IGNORED_DOMAINS = [
  "example.com", "sentry.io", "wixpress.com", "googleapis.com",
  "w3.org", "schema.org", "facebook.com", "instagram.com",
  "twitter.com", "google.com", "youtube.com", "linkedin.com",
  "cloudflare.com", "jquery.com", "wordpress.org", "gravatar.com",
];

function isValidBusinessEmail(email: string): boolean {
  const lower = email.toLowerCase();
  if (IGNORED_DOMAINS.some((d) => lower.endsWith(`@${d}`))) return false;
  if (lower.includes("noreply") || lower.includes("no-reply")) return false;
  if (lower.includes("unsubscribe") || lower.includes("mailer-daemon")) return false;
  if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".svg")) return false;
  return true;
}

function extractDomain(url: string): string | null {
  try {
    const u = new URL(url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

async function fetchPage(url: string, timeout = 8000): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Tadnun/1.0; business outreach)",
        Accept: "text/html",
      },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function extractEmails(html: string): string[] {
  const decoded = html
    .replace(/&#64;/g, "@")
    .replace(/\[at\]/gi, "@")
    .replace(/\(at\)/gi, "@")
    .replace(/ at /gi, "@");
  const matches = decoded.match(EMAIL_REGEX) ?? [];
  return [...new Set(matches.filter(isValidBusinessEmail))];
}

function pickBestEmail(emails: string[], domain: string | null): string | null {
  if (emails.length === 0) return null;
  const domainEmails = domain
    ? emails.filter((e) => e.toLowerCase().endsWith(`@${domain}`))
    : [];
  if (domainEmails.length > 0) {
    const priority = ["contact", "info", "reception", "reservations", "booking", "accueil", "direction"];
    for (const prefix of priority) {
      const match = domainEmails.find((e) => e.toLowerCase().startsWith(`${prefix}@`));
      if (match) return match.toLowerCase();
    }
    return domainEmails[0].toLowerCase();
  }
  return emails[0].toLowerCase();
}

async function enrichProspect(p: ProspectRow): Promise<string | null> {
  if (!p.website) return null;
  const domain = extractDomain(p.website);
  const pagesToTry = [
    p.website,
    p.website.replace(/\/$/, "") + "/contact",
    p.website.replace(/\/$/, "") + "/contact-us",
    p.website.replace(/\/$/, "") + "/nous-contacter",
    p.website.replace(/\/$/, "") + "/contactez-nous",
  ];
  const allEmails: string[] = [];
  for (const url of pagesToTry) {
    const html = await fetchPage(url);
    if (html) allEmails.push(...extractEmails(html));
    if (allEmails.length > 0 && url !== p.website) break;
    await sleep(500);
  }
  return pickBestEmail(allEmails, domain);
}

export async function runEnrichment(): Promise<number> {
  const prospects = await getProspectsToEnrich();
  const batch = prospects.slice(0, ENRICH_BATCH_SIZE);
  console.log(`\n[enricher] Enriching ${batch.length} prospects...`);

  let enriched = 0;
  let noEmail = 0;
  let invalid = 0;

  for (const p of batch) {
    const email = await enrichProspect(p);
    if (email) {
      // Verify before accepting
      const check = await verifyEmail(email);
      if (check.valid) {
        await updateProspect(p.id, { email, status: "enriched" });
        enriched++;
        console.log(`  ✓ ${p.name} → ${email}`);
      } else {
        await updateProspect(p.id, { status: "enriched" });
        invalid++;
        console.log(`  ✗ ${p.name} → ${email} — rejected: ${check.reason}`);
      }
    } else {
      await updateProspect(p.id, { status: "enriched" });
      noEmail++;
      console.log(`  ✗ ${p.name} — no email found`);
    }
    await sleep(WEBSITE_SCRAPE_DELAY_MS);
  }

  const noWebsite = await getProspectsWithoutWebsite();
  for (const p of noWebsite) {
    await updateProspect(p.id, { status: "enriched" });
  }

  await logActivity(null, "enrichment_complete", `Enriched: ${enriched}, No email: ${noEmail + noWebsite.length}, Invalid: ${invalid}`);
  console.log(`[enricher] Done — ${enriched} verified, ${invalid} rejected, ${noEmail + noWebsite.length} without email\n`);
  return enriched;
}
