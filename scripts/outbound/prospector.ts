// ============================================================
// Outbound GTM Automation — Google Places Prospector
// ============================================================

import {
  ENV,
  SECTORS,
  PROSPECTS_PER_SEARCH,
  GOOGLE_PLACES_DELAY_MS,
  type SectorConfig,
} from "./config";
import {
  insertProspect,
  recordScan,
  getLastScan,
  logActivity,
} from "./db";

const PLACES_TEXT_SEARCH_URL = "https://places.googleapis.com/v1/places:searchText";

interface PlaceResult {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
}

interface TextSearchResponse {
  places?: PlaceResult[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function searchPlaces(query: string, city: string): Promise<PlaceResult[]> {
  if (!ENV.GOOGLE_PLACES_API_KEY) {
    console.warn("[prospector] GOOGLE_PLACES_API_KEY not set — skipping");
    return [];
  }

  const fullQuery = `${query} in ${city}, Morocco`;
  const fieldMask = [
    "places.id",
    "places.displayName",
    "places.formattedAddress",
    "places.nationalPhoneNumber",
    "places.websiteUri",
    "places.rating",
    "places.userRatingCount",
  ].join(",");

  const res = await fetch(PLACES_TEXT_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": ENV.GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask": fieldMask,
    },
    body: JSON.stringify({
      textQuery: fullQuery,
      maxResultCount: PROSPECTS_PER_SEARCH,
      languageCode: "fr",
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`[prospector] Places API error (${res.status}): ${text}`);
    return [];
  }

  const data = (await res.json()) as TextSearchResponse;
  return data.places ?? [];
}

function placeToProspect(place: PlaceResult, sector: string, city: string) {
  return {
    google_place_id: place.id,
    name: place.displayName?.text ?? "Unknown",
    sector,
    city,
    address: place.formattedAddress ?? null,
    phone: place.nationalPhoneNumber ?? null,
    website: place.websiteUri ?? null,
    email: null as string | null,
    google_rating: place.rating ?? null,
    google_reviews: place.userRatingCount ?? 0,
    has_website: !!place.websiteUri,
  };
}

async function pickScanTargets(maxPairs = 3): Promise<{ sector: SectorConfig; city: string }[]> {
  const candidates: { sector: SectorConfig; city: string; lastScan: string | null }[] = [];

  for (const sector of SECTORS) {
    for (const city of sector.cities) {
      const last = await getLastScan(sector.key, city);
      candidates.push({ sector, city, lastScan: last?.scanned_at ?? null });
    }
  }

  candidates.sort((a, b) => {
    if (a.sector.tier !== b.sector.tier) return a.sector.tier - b.sector.tier;
    if (!a.lastScan) return -1;
    if (!b.lastScan) return 1;
    return a.lastScan.localeCompare(b.lastScan);
  });

  return candidates.slice(0, maxPairs);
}

export async function runProspecting(): Promise<number> {
  console.log("\n[prospector] Starting prospecting cycle...");
  const targets = await pickScanTargets(3);
  let totalNew = 0;

  for (const { sector, city } of targets) {
    for (const query of sector.searchQueries) {
      console.log(`[prospector] Searching: "${query}" in ${city} (${sector.key})`);

      const places = await searchPlaces(query, city);
      let newCount = 0;

      for (const place of places) {
        const prospect = placeToProspect(place, sector.key, city);
        const result = await insertProspect(prospect);
        if (result.inserted) newCount++;
      }

      await recordScan(sector.key, city, query, places.length);
      totalNew += newCount;
      console.log(`  → ${places.length} results, ${newCount} new prospects`);

      await sleep(GOOGLE_PLACES_DELAY_MS);
    }
  }

  await logActivity(null, "prospecting_complete", `Found ${totalNew} new prospects`);
  console.log(`[prospector] Done — ${totalNew} new prospects added\n`);
  return totalNew;
}
