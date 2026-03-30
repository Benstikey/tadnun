// Targeted restaurant/café prospecting — Casablanca
import "./config";
import { ENV, GOOGLE_PLACES_DELAY_MS } from "./config";
import { insertProspect, recordScan, logActivity } from "./db";

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const QUERIES = [
  "restaurant Maarif Casablanca",
  "restaurant Ain Diab Casablanca",
  "restaurant Anfa Casablanca",
  "restaurant Gauthier Casablanca",
  "café restaurant Casablanca",
  "restaurant Bourgogne Casablanca",
  "restaurant Racine Casablanca",
  "restaurant marocain Casablanca",
  "pizzeria Casablanca",
  "café Casablanca centre ville",
  "brunch Casablanca",
  "restaurant fruits de mer Casablanca",
];

async function search(query: string) {
  const res = await fetch(PLACES_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": ENV.GOOGLE_PLACES_API_KEY,
      "X-Goog-FieldMask": "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount",
    },
    body: JSON.stringify({ textQuery: query, maxResultCount: 20, languageCode: "fr" }),
  });
  if (!res.ok) { console.error(`Error: ${res.status}`); return []; }
  const data = await res.json();
  return data.places ?? [];
}

async function main() {
  console.log("\n🍽️  Restaurant prospecting — Casablanca\n");
  let totalNew = 0;

  for (const query of QUERIES) {
    console.log(`Searching: "${query}"...`);
    const places = await search(query);
    let newCount = 0;
    for (const p of places) {
      const result = await insertProspect({
        google_place_id: p.id,
        name: p.displayName?.text ?? "Unknown",
        sector: "restaurants",
        city: "Casablanca",
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
    await recordScan("restaurants", "Casablanca", query, places.length);
    totalNew += newCount;
    console.log(`  → ${places.length} results, ${newCount} new`);
    await sleep(GOOGLE_PLACES_DELAY_MS);
  }

  await logActivity(null, "restaurant_prospecting", `Casablanca: ${totalNew} new prospects`);
  console.log(`\n✅ Done — ${totalNew} new restaurant prospects\n`);
}

main();
