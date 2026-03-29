// ============================================================
// Outbound GTM Automation — ICP Scoring Engine
// ============================================================

import { SECTORS } from "./config";
import {
  getProspectsToScore,
  updateProspect,
  logActivity,
  type ProspectRow,
} from "./db";

interface ScoreBreakdown {
  sectorTier: number;
  cityMatch: number;
  digitalGap: number;
  reviewSignal: number;
  ratingSignal: number;
  total: number;
}

function scoreSectorTier(sector: string): number {
  const cfg = SECTORS.find((s) => s.key === sector);
  if (!cfg) return 0;
  if (cfg.tier === 1) return 25;
  if (cfg.tier === 2) return 15;
  return 5;
}

const PRIMARY_CITIES = ["Casablanca", "Marrakech", "Rabat", "Agadir", "Tanger", "Fes"];

function scoreCityMatch(city: string): number {
  if (PRIMARY_CITIES.some((c) => city.toLowerCase().includes(c.toLowerCase()))) return 15;
  return 10;
}

function scoreDigitalGap(p: ProspectRow): number {
  if (!p.has_website && p.google_reviews < 10) return 20;
  if (!p.has_website) return 15;
  if (p.google_reviews < 20) return 12;
  return 5;
}

function scoreReviewSignal(reviews: number): number {
  if (reviews === 0) return 10;
  if (reviews < 10) return 12;
  if (reviews < 30) return 15;
  if (reviews < 100) return 10;
  return 5;
}

function scoreRatingSignal(rating: number | null): number {
  if (rating === null) return 8;
  if (rating < 3.5) return 10;
  if (rating < 4.0) return 12;
  if (rating < 4.5) return 8;
  return 5;
}

function scoreProspect(p: ProspectRow): ScoreBreakdown {
  const sectorTier = scoreSectorTier(p.sector);
  const cityMatch = scoreCityMatch(p.city);
  const digitalGap = scoreDigitalGap(p);
  const reviewSignal = scoreReviewSignal(p.google_reviews);
  const ratingSignal = scoreRatingSignal(p.google_rating);

  return {
    sectorTier,
    cityMatch,
    digitalGap,
    reviewSignal,
    ratingSignal,
    total: sectorTier + cityMatch + digitalGap + reviewSignal + ratingSignal,
  };
}

export async function runScoring(): Promise<number> {
  const prospects = await getProspectsToScore();
  console.log(`\n[scorer] Scoring ${prospects.length} prospects...`);

  let scored = 0;
  for (const p of prospects) {
    const breakdown = scoreProspect(p);
    await updateProspect(p.id, {
      score: breakdown.total,
      status: "scored",
      notes: JSON.stringify(breakdown),
    });
    scored++;
  }

  await logActivity(null, "scoring_complete", `Scored ${scored} prospects`);
  console.log(`[scorer] Done — ${scored} prospects scored\n`);
  return scored;
}
