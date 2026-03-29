// ============================================================
// Outbound GTM Automation — Weekly Reporter
// ============================================================

import { getStats, getDb } from "./db";

export async function generateReport(): Promise<string> {
  const stats = await getStats();
  const db = getDb();

  const { data: topProspects } = await db
    .from("prospects")
    .select("*")
    .not("email", "is", null)
    .order("score", { ascending: false })
    .limit(10);

  const { data: sectorEmails } = await db
    .from("sequence_emails")
    .select("*, prospects!inner(sector)")
    .order("scheduled_for", { ascending: false });

  // Aggregate sector email stats
  const sectorMap = new Map<string, { total: number; sent: number; pending: number }>();
  for (const row of (sectorEmails ?? []) as Record<string, unknown>[]) {
    const sector = (row.prospects as { sector: string })?.sector ?? "unknown";
    const entry = sectorMap.get(sector) ?? { total: 0, sent: 0, pending: 0 };
    entry.total++;
    if (row.status === "sent") entry.sent++;
    if (row.status === "pending") entry.pending++;
    sectorMap.set(sector, entry);
  }

  const { data: recentActivity } = await db
    .from("activity_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(20);

  const lines: string[] = [
    "═══════════════════════════════════════════════════",
    "  TADNUN OUTBOUND GTM — WEEKLY REPORT",
    `  Generated: ${new Date().toISOString().substring(0, 16)}`,
    "═══════════════════════════════════════════════════",
    "",
    "📊 PIPELINE OVERVIEW",
    `  Total prospects:    ${stats.total}`,
    `  This week (new):    ${stats.thisWeek.prospected}`,
    `  Emails sent (week): ${stats.thisWeek.emailsSent}`,
    "",
    "  Status breakdown:",
    ...stats.byStatus.map((s) => `    ${s.status.padEnd(15)} ${s.count}`),
    "",
    "📧 EMAIL STATS",
    `  Pending:  ${stats.emailsPending}`,
    `  Sent:     ${stats.emailsSent}`,
    `  Failed:   ${stats.emailsFailed}`,
    "",
  ];

  if (sectorMap.size > 0) {
    lines.push("📁 BY SECTOR");
    for (const [sector, s] of sectorMap) {
      lines.push(`  ${sector.padEnd(15)} ${s.sent} sent / ${s.pending} pending / ${s.total} total`);
    }
    lines.push("");
  }

  if ((topProspects ?? []).length > 0) {
    lines.push("⭐ TOP PROSPECTS (by ICP score)");
    for (const p of topProspects ?? []) {
      lines.push(`  [${p.score}] ${p.name} (${p.sector}, ${p.city}) — ${p.email}`);
    }
    lines.push("");
  }

  if ((recentActivity ?? []).length > 0) {
    lines.push("📋 RECENT ACTIVITY");
    for (const a of (recentActivity ?? []).slice(0, 10)) {
      lines.push(`  ${a.created_at} | ${a.action} | ${a.details ?? ""}`);
    }
    lines.push("");
  }

  lines.push("═══════════════════════════════════════════════════");
  return lines.join("\n");
}

export async function runReport(): Promise<void> {
  console.log(await generateReport());
}
