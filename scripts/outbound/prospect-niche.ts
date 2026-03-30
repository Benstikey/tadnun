// Niche sector prospecting — tech, architecture, manufacturing, industrial
import "./config";
import { ENV, GOOGLE_PLACES_DELAY_MS } from "./config";
import { insertProspect, recordScan, logActivity } from "./db";

const PLACES_URL = "https://places.googleapis.com/v1/places:searchText";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const TARGETS = [
  // Tech / IT companies
  { query: "agence digitale Casablanca", sector: "tech", city: "Casablanca" },
  { query: "startup technologie Casablanca", sector: "tech", city: "Casablanca" },
  { query: "développement web Casablanca", sector: "tech", city: "Casablanca" },
  { query: "société informatique Rabat", sector: "tech", city: "Rabat" },
  { query: "agence web Marrakech", sector: "tech", city: "Marrakech" },

  // Architecture / BTP / Bureau d'études
  { query: "cabinet architecture Casablanca", sector: "architecture", city: "Casablanca" },
  { query: "bureau d'études Casablanca", sector: "architecture", city: "Casablanca" },
  { query: "architecte Rabat", sector: "architecture", city: "Rabat" },
  { query: "architecte d'intérieur Marrakech", sector: "architecture", city: "Marrakech" },
  { query: "cabinet architecture Tanger", sector: "architecture", city: "Tanger" },

  // Manufacturing / Industrial / Matériaux
  { query: "usine plastique Casablanca", sector: "manufacturing", city: "Casablanca" },
  { query: "menuiserie aluminium Casablanca", sector: "manufacturing", city: "Casablanca" },
  { query: "chaudronnerie métallique Casablanca", sector: "manufacturing", city: "Casablanca" },
  { query: "fabricant emballage Casablanca", sector: "manufacturing", city: "Casablanca" },
  { query: "société industrielle Tanger", sector: "manufacturing", city: "Tanger" },
  { query: "menuiserie bois Marrakech", sector: "manufacturing", city: "Marrakech" },
  { query: "imprimerie industrielle Casablanca", sector: "manufacturing", city: "Casablanca" },

  // Niche services
  { query: "cabinet comptable Casablanca", sector: "accounting", city: "Casablanca" },
  { query: "fiduciaire Casablanca", sector: "accounting", city: "Casablanca" },
  { query: "avocat d'affaires Casablanca", sector: "legal", city: "Casablanca" },
  { query: "notaire Casablanca", sector: "legal", city: "Casablanca" },
  { query: "laboratoire analyse médicale Casablanca", sector: "lab", city: "Casablanca" },
  { query: "centre d'appel Casablanca", sector: "callcenter", city: "Casablanca" },
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
  console.log("\n🔧 Niche sector prospecting\n");
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
    console.log(`  → ${places.length} results, ${newCount} new (${places.filter((p: {websiteUri?: string}) => p.websiteUri).length} with website)`);
    await sleep(GOOGLE_PLACES_DELAY_MS);
  }

  await logActivity(null, "niche_prospecting", `${totalNew} new (${withWebsite} with website)`);
  console.log(`\n✅ Done — ${totalNew} new prospects (${withWebsite} with website)\n`);
}

main();
