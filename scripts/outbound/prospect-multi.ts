// Multi-sector prospecting — skip agriculture
import "./config";
import { ENV, GOOGLE_PLACES_DELAY_MS } from "./config";
import { insertProspect, recordScan, logActivity } from "./db";

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  // Tourism — Marrakech & Essaouira
  { sector: "tourism", query: "riad Marrakech", city: "Marrakech" },
  { sector: "tourism", query: "hôtel Marrakech", city: "Marrakech" },
  { sector: "tourism", query: "maison d'hôtes Essaouira", city: "Essaouira" },
  { sector: "tourism", query: "riad Essaouira", city: "Essaouira" },
  // Healthcare — Casablanca & Rabat
  { sector: "healthcare", query: "clinique privée Casablanca", city: "Casablanca" },
  { sector: "healthcare", query: "cabinet dentaire Casablanca", city: "Casablanca" },
  { sector: "healthcare", query: "clinique Rabat", city: "Rabat" },
  { sector: "healthcare", query: "cabinet médical Rabat", city: "Rabat" },
  // Restaurants — Marrakech
  { sector: "restaurants", query: "restaurant Marrakech Guéliz", city: "Marrakech" },
  { sector: "restaurants", query: "café restaurant Marrakech", city: "Marrakech" },
  // Retail — Casablanca
  { sector: "retail", query: "boutique Maarif Casablanca", city: "Casablanca" },
  { sector: "retail", query: "magasin Casablanca", city: "Casablanca" },
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
  if (!res.ok) return [];
  const data = await res.json();
  return data.places ?? [];
}

async function main() {
  console.log("\n🔍 Multi-sector prospecting\n");
  let totalNew = 0;

  for (const { sector, query, city } of TARGETS) {
    console.log(`[${sector}] "${query}"...`);
    const places = await search(query);
    let newCount = 0;
    for (const p of places) {
      const result = await insertProspect({
        google_place_id: p.id,
        name: p.displayName?.text ?? "Unknown",
        sector,
        city,
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
    await recordScan(sector, city, query, places.length);
    totalNew += newCount;
    console.log(`  → ${places.length} results, ${newCount} new`);
    await sleep(GOOGLE_PLACES_DELAY_MS);
  }

  await logActivity(null, "multi_sector_prospecting", `${totalNew} new prospects`);
  console.log(`\n✅ Done — ${totalNew} new prospects\n`);
}

main();
