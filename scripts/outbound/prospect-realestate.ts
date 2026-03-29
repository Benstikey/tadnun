// Deep real estate prospecting for Casablanca
// Targets specific neighborhoods and query variants to maximize website hits

import "./config";
import { ENV, GOOGLE_PLACES_DELAY_MS } from "./config";
import { insertProspect, recordScan, logActivity } from "./db";

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const QUERIES = [
  // Neighborhoods with high real estate activity
  "agence immobilière Maarif Casablanca",
  "agence immobilière Ain Diab Casablanca",
  "agence immobilière Bourgogne Casablanca",
  "agence immobilière Gauthier Casablanca",
  "agence immobilière Anfa Casablanca",
  "agence immobilière Racine Casablanca",
  "agence immobilière Palmiers Casablanca",
  "agence immobilière Hay Hassani Casablanca",
  "agence immobilière Ain Sebaa Casablanca",
  "immobilier Bouskoura",
  "immobilier Dar Bouazza",
  "immobilier Mohammedia",
  // Specific types
  "promoteur immobilier Casablanca",
  "cabinet immobilier Casablanca",
  "conseil immobilier Casablanca",
  "gestion locative Casablanca",
  "syndic Casablanca immobilier",
];

async function search(query: string) {
  const res = await fetch(PLACES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": ENV.GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: 20,
      languageCode: "fr",
    }),
  });
  if (!res.ok) { console.error(`Error: ${res.status}`); return []; }
  const data = await res.json();
  return data.places ?? [];
}

async function main() {
  console.log("\n🏠 Deep Real Estate Prospecting — Casablanca\n");
  let totalNew = 0;
  let totalWithWebsite = 0;

  for (const query of QUERIES) {
    console.log(`Searching: "${query}"...`);
    const places = await search(query);
    let newCount = 0;

    for (const p of places) {
      const result = await insertProspect({
        google_place_id: p.id,
        name: p.displayName?.text ?? "Unknown",
        sector: "realestate",
        city: "Casablanca",
        address: p.formattedAddress ?? null,
        phone: p.nationalPhoneNumber ?? null,
        website: p.websiteUri ?? null,
        email: null,
        google_rating: p.rating ?? null,
        google_reviews: p.userRatingCount ?? 0,
        has_website: !!p.websiteUri,
      });
      if (result.inserted) {
        newCount++;
        if (p.websiteUri) totalWithWebsite++;
      }
    }

    await recordScan("realestate", "Casablanca", query, places.length);
    totalNew += newCount;
    console.log(`  → ${places.length} results, ${newCount} new (${places.filter((p: { websiteUri?: string }) => p.websiteUri).length} with website)`);
    await sleep(GOOGLE_PLACES_DELAY_MS);
  }

  await logActivity(null, "deep_prospecting", `realestate Casablanca: ${totalNew} new, ${totalWithWebsite} with website`);
  console.log(`\n✅ Done — ${totalNew} new prospects (${totalWithWebsite} with website)\n`);
}

main();
