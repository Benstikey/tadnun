// ============================================================
// Outbound GTM Automation — Sequence Engine
// ============================================================

import { SEQUENCE_DELAYS_DAYS } from "./config";
import {
  getProspectsToEnroll,
  insertSequenceEmail,
  updateProspect,
  logActivity,
} from "./db";
import { getSequenceForSector, renderEmail } from "./templates";

function addDays(date: Date, days: number): string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  d.setUTCHours(8, 0, 0, 0);
  return d.toISOString();
}

export async function runEnrollment(): Promise<number> {
  const prospects = await getProspectsToEnroll();
  console.log(`\n[sequencer] Enrolling ${prospects.length} prospects...`);

  let enrolled = 0;
  const now = new Date();

  for (const p of prospects) {
    const sequence = getSequenceForSector(p.sector);
    if (!sequence) {
      console.log(`  ✗ No sequence for sector: ${p.sector}`);
      continue;
    }

    const steps = [
      { step: 1, template: sequence.step1, key: `${p.sector}_step1` },
      { step: 2, template: sequence.step2, key: `${p.sector}_step2` },
      { step: 3, template: sequence.step3, key: `${p.sector}_step3` },
    ];

    for (let i = 0; i < steps.length; i++) {
      const { step, template, key } = steps[i];
      const rendered = renderEmail(template, { name: p.name, city: p.city, sector: p.sector });

      await insertSequenceEmail({
        prospect_id: p.id,
        step,
        template_key: key,
        subject: rendered.subject,
        body_html: rendered.bodyHtml,
        scheduled_for: addDays(now, SEQUENCE_DELAYS_DAYS[i]),
      });
    }

    await updateProspect(p.id, { status: "enrolled" });
    enrolled++;
    console.log(`  ✓ ${p.name} (${p.sector}) — 3 emails scheduled`);
  }

  await logActivity(null, "enrollment_complete", `Enrolled ${enrolled} prospects`);
  console.log(`[sequencer] Done — ${enrolled} prospects enrolled\n`);
  return enrolled;
}
