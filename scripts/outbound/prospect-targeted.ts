// One-off targeted prospecting script
// Usage: npx tsx scripts/outbound/prospect-targeted.ts

import "./config"; // loads dotenv
import { ENV, GOOGLE_PLACES_DELAY_MS } from "./config";
import { insertProspect, recordScan, logActivity, getDb } from "./db";

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const QUERIES = [
  "agence immobilière",
  "promoteur immobilier",
  "agence immobiliere casablanca",
  "real estate agency",
  "agent immobilier",
  "immobilier casablanca",
];

const CITY = "Casablanca";
const SECTOR = "realestate";

async function search(query: string) {
  const res = await fetch(PLACES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": ENV.GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({
      textQuery: `${query} in ${CITY}, Morocco`,
      maxResultCount: 20,
      languageCode: "fr",
    }),
  });
  if (!res.ok) { console.error(await res.text()); return []; }
  const data = await res.json();
  return data.places ?? [];
}

async function main() {
  console.log(`\nTargeted prospecting: ${SECTOR} in ${CITY}\n`);
  let total = 0;

  for (const query of QUERIES) {
    console.log(`Searching: "${query}"...`);
    const places = await search(query);
    let newCount = 0;

    for (const p of places) {
      const result = await insertProspect({
        google_place_id: p.id,
        name: p.displayName?.text ?? "Unknown",
        sector: SECTOR,
        city: CITY,
        address: p.formattedAddress ?? null,
        phone: p.nationalPhoneNumber ?? null,
        website: p.websiteUri ?? null,
        email: null,
        google_rating: p.rating ?? null,
        google_reviews: p.userRatingCount ?? 0,
        has_website: !!p.websiteUri,
      });
      if (result.inserted) newCount++;
    }

    await recordScan(SECTOR, CITY, query, places.length);
    total += newCount;
    console.log(`  → ${places.length} results, ${newCount} new`);
    await sleep(GOOGLE_PLACES_DELAY_MS);
  }

  await logActivity(null, "targeted_prospecting", `${SECTOR} in ${CITY}: ${total} new prospects`);
  console.log(`\nDone — ${total} new real estate prospects in Casablanca\n`);
}

main();
