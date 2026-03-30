// General business prospecting — outside the 8 core sectors
import "./config";
import { ENV, GOOGLE_PLACES_DELAY_MS } from "./config";
import { insertProspect, recordScan, logActivity } from "./db";

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  // Spa & Wellness
  { query: "spa hammam Casablanca", sector: "wellness", city: "Casablanca" },
  { query: "spa Marrakech", sector: "wellness", city: "Marrakech" },
  // Fitness & Gyms
  { query: "salle de sport Casablanca", sector: "fitness", city: "Casablanca" },
  { query: "salle de sport Rabat", sector: "fitness", city: "Rabat" },
  // Beauty & Salons
  { query: "salon de coiffure haut de gamme Casablanca", sector: "beauty", city: "Casablanca" },
  { query: "salon esthétique Marrakech", sector: "beauty", city: "Marrakech" },
  // Event & Wedding venues
  { query: "salle des fêtes Casablanca", sector: "events", city: "Casablanca" },
  { query: "traiteur mariage Casablanca", sector: "events", city: "Casablanca" },
  // Car rental
  { query: "location voiture Casablanca", sector: "carrental", city: "Casablanca" },
  { query: "location voiture Marrakech", sector: "carrental", city: "Marrakech" },
  // Auto repair / garages
  { query: "garage automobile Casablanca", sector: "auto", city: "Casablanca" },
  // Veterinary
  { query: "vétérinaire Casablanca", sector: "veterinary", city: "Casablanca" },
  // Photography
  { query: "photographe professionnel Casablanca", sector: "photography", city: "Casablanca" },
  // Printing / imprimerie
  { query: "imprimerie Casablanca", sector: "printing", city: "Casablanca" },
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
  console.log("\n🔍 General business prospecting\n");
  let totalNew = 0;
  let withWebsite = 0;

  for (const { query, sector, city } of TARGETS) {
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
      if (result.inserted) {
        newCount++;
        if (p.websiteUri) withWebsite++;
      }
    }
    await recordScan(sector, city, query, places.length);
    totalNew += newCount;
    console.log(`  → ${places.length} results, ${newCount} new`);
    await sleep(GOOGLE_PLACES_DELAY_MS);
  }

  await logActivity(null, "general_prospecting", `${totalNew} new prospects (${withWebsite} with website)`);
  console.log(`\n✅ Done — ${totalNew} new prospects (${withWebsite} with website)\n`);
}

main();
