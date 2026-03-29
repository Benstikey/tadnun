#!/usr/bin/env npx tsx
// ============================================================
// Outbound GTM Automation — CLI Entry Point
// ============================================================
//
// Usage:
//   npx tsx scripts/outbound/run.ts <command>
//
// Commands:
//   pipeline    Run the full daily pipeline once (score → enrich → enroll → send)
//   prospect    Run prospecting (find new businesses via Google Places)
//   score       Score unscored prospects
//   enrich      Find emails for scored prospects
//   enroll      Enroll qualified prospects into email sequences
//   send        Send all due emails
//   report      Print the weekly report
//   stats       Show quick pipeline stats
//   cron        Start the cron scheduler (runs autonomously)

import { runProspecting } from "./prospector";
import { runScoring } from "./scorer";
import { runEnrichment } from "./enricher";
import { runEnrollment } from "./sequencer";
import { runSender } from "./sender";
import { runReport } from "./reporter";
import { getStats } from "./db";

const command = process.argv[2];

async function pipeline() {
  console.log("\n🔄 Running full daily pipeline...\n");
  await runScoring();
  await runEnrichment();
  await runEnrollment();
  await runSender();
  console.log("✅ Pipeline complete.\n");
}

async function main() {
  switch (command) {
    case "pipeline":
      await pipeline();
      break;

    case "prospect":
      await runProspecting();
      break;

    case "score":
      await runScoring();
      break;

    case "enrich":
      await runEnrichment();
      break;

    case "enroll":
      await runEnrollment();
      break;

    case "send":
      await runSender();
      break;

    case "report":
      await runReport();
      break;

    case "stats": {
      const stats = await getStats();
      console.log("\n📊 Quick Stats:");
      console.log(`  Total prospects: ${stats.total}`);
      console.log(`  By status:`);
      for (const s of stats.byStatus) {
        console.log(`    ${s.status.padEnd(15)} ${s.count}`);
      }
      console.log(`  By sector:`);
      for (const s of stats.bySector) {
        console.log(`    ${s.sector.padEnd(15)} ${s.count}`);
      }
      console.log(`  Emails — Pending: ${stats.emailsPending} | Sent: ${stats.emailsSent} | Failed: ${stats.emailsFailed}`);
      console.log(`  This week — New: ${stats.thisWeek.prospected} | Emails sent: ${stats.thisWeek.emailsSent}\n`);
      break;
    }

    case "cron":
      await import("./cron");
      break;

    default:
      console.log(`
Tadnun Outbound GTM Automation (Supabase)
==========================================

Usage: npx tsx scripts/outbound/run.ts <command>

Commands:
  pipeline    Run the full daily pipeline once
  prospect    Find new businesses via Google Places
  score       Score unscored prospects
  enrich      Find emails for scored prospects
  enroll      Enroll qualified prospects into sequences
  send        Send all due emails
  report      Print weekly report
  stats       Show quick pipeline stats
  cron        Start autonomous cron scheduler

Environment variables (set in .env.local):
  GOOGLE_PLACES_API_KEY          Google Cloud Places API key
  RESEND_API_KEY                 Resend.com API key
  NEXT_PUBLIC_SUPABASE_URL       Supabase project URL
  SUPABASE_SERVICE_ROLE_KEY      Supabase service role key
  OUTBOUND_SENDER_EMAIL          Sender email (default: wassim@tadnun.com)
  OUTBOUND_SENDER_NAME           Sender name (default: Wassim — Tadnun)
`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
