// ============================================================
// Outbound GTM Automation — Cron Scheduler
// ============================================================

import cron from "node-cron";
import { runProspecting } from "./prospector";
import { runScoring } from "./scorer";
import { runEnrichment } from "./enricher";
import { runEnrollment } from "./sequencer";
import { runSender } from "./sender";
import { runReport } from "./reporter";
import { logActivity } from "./db";

async function dailyPipeline() {
  const start = Date.now();
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  DAILY PIPELINE — ${new Date().toISOString()}`);
  console.log(`${"=".repeat(60)}\n`);

  try {
    await runScoring();
    await runEnrichment();
    await runEnrollment();
    await runSender();

    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(`\n✅ Daily pipeline complete in ${elapsed}s\n`);
    await logActivity(null, "daily_pipeline_complete", `Elapsed: ${elapsed}s`);
  } catch (err) {
    console.error("❌ Pipeline error:", err);
    await logActivity(null, "pipeline_error", err instanceof Error ? err.message : String(err));
  }
}

async function mondayProspecting() {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  MONDAY PROSPECTING — ${new Date().toISOString()}`);
  console.log(`${"=".repeat(60)}\n`);

  try {
    await runProspecting();
  } catch (err) {
    console.error("❌ Prospecting error:", err);
    await logActivity(null, "prospecting_error", err instanceof Error ? err.message : String(err));
  }
}

async function fridayReport() {
  console.log(`\n${"=".repeat(60)}`);
  console.log(`  FRIDAY REPORT — ${new Date().toISOString()}`);
  console.log(`${"=".repeat(60)}\n`);
  await runReport();
}

console.log("🚀 Tadnun Outbound GTM — Cron Scheduler Started");
console.log("   Daily pipeline:    Every day at 09:00 (UTC+1)");
console.log("   Prospecting:       Every Monday at 08:00 (UTC+1)");
console.log("   Weekly report:     Every Friday at 17:00 (UTC+1)");
console.log("   Press Ctrl+C to stop\n");

cron.schedule("0 8 * * *", () => { dailyPipeline(); }, { timezone: "Africa/Casablanca" });
cron.schedule("0 7 * * 1", () => { mondayProspecting(); }, { timezone: "Africa/Casablanca" });
cron.schedule("0 17 * * 5", () => { fridayReport(); }, { timezone: "Africa/Casablanca" });

process.on("SIGINT", () => {
  console.log("\n👋 Cron scheduler stopped.");
  process.exit(0);
});
