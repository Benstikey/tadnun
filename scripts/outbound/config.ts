// ============================================================
// Outbound GTM Automation — Configuration
// ============================================================

import path from "path";
import dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: path.join(__dirname, "../../.env.local") });

// --------------- Environment ---------------
export const ENV = {
  GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY ?? "",
  RESEND_API_KEY: process.env.RESEND_API_KEY ?? "",
  SENDER_EMAIL: process.env.OUTBOUND_SENDER_EMAIL ?? "wassim@tadnun.com",
  SENDER_NAME: process.env.OUTBOUND_SENDER_NAME ?? "Wassim — Tadnun",
  REPLY_TO_EMAIL: process.env.OUTBOUND_REPLY_TO_EMAIL ?? "wassimbenchekroun0@gmail.com",
  ABSTRACT_API_KEY: process.env.ABSTRACT_API_KEY ?? "",
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
};

// --------------- Sectors & Search Queries ---------------
export interface SectorConfig {
  key: string;
  name: string;
  tier: 1 | 2 | 3;
  searchQueries: string[]; // French terms for Google Places
  cities: string[];        // Target cities
}

export const SECTORS: SectorConfig[] = [
  // Tier 1 — High-value, high-intent
  {
    key: "tourism",
    name: "Tourism & Hospitality",
    tier: 1,
    searchQueries: ["hôtel", "riad", "maison d'hôtes", "auberge"],
    cities: ["Marrakech", "Essaouira", "Fes", "Chefchaouen", "Tanger"],
  },
  {
    key: "restaurants",
    name: "Restaurants & Cafés",
    tier: 1,
    searchQueries: ["restaurant", "café restaurant", "fast food", "snack"],
    cities: ["Casablanca", "Marrakech", "Rabat", "Tanger", "Agadir"],
  },
  {
    key: "agriculture",
    name: "Agriculture & Cooperatives",
    tier: 1,
    searchQueries: ["coopérative agricole", "ferme", "exploitation agricole"],
    cities: ["Agadir", "Meknes", "Essaouira", "Beni Mellal"],
  },
  // Tier 2 — Growth sectors
  {
    key: "healthcare",
    name: "Healthcare & Clinics",
    tier: 2,
    searchQueries: ["clinique", "cabinet médical", "cabinet dentaire", "laboratoire d'analyses"],
    cities: ["Rabat", "Casablanca", "Fes", "Marrakech"],
  },
  {
    key: "realestate",
    name: "Real Estate",
    tier: 2,
    searchQueries: ["agence immobilière", "promoteur immobilier"],
    cities: ["Casablanca", "Marrakech", "Tanger", "Rabat"],
  },
  {
    key: "retail",
    name: "Retail & Commerce",
    tier: 2,
    searchQueries: ["magasin", "boutique", "supermarché"],
    cities: ["Casablanca", "Rabat", "Tanger", "Marrakech"],
  },
  // Tier 3 — Exploratory
  {
    key: "education",
    name: "Education & Training",
    tier: 3,
    searchQueries: ["école privée", "institut", "centre de formation"],
    cities: ["Rabat", "Casablanca"],
  },
  {
    key: "logistics",
    name: "Logistics",
    tier: 3,
    searchQueries: ["société de transport", "livraison", "logistique"],
    cities: ["Casablanca", "Tanger"],
  },
];

// --------------- Prospecting Schedule ---------------
// Each week, rotate through sector-city pairs. Tier 1 gets 3x more slots.
export const PROSPECTS_PER_SEARCH = 20; // Google Places returns max 20 per query
export const MAX_DAILY_EMAILS = 95;     // Stay under Resend's 100/day free limit
export const ENRICH_BATCH_SIZE = 30;    // Websites to scrape per run
export const MIN_SCORE_TO_ENROLL = 60;  // ICP score threshold

// --------------- Sequence Timing ---------------
export const SEQUENCE_DELAYS_DAYS = [0, 3, 7]; // Day 0, Day 3, Day 7

// --------------- Rate Limits ---------------
export const GOOGLE_PLACES_DELAY_MS = 1500;  // 1.5s between API calls
export const WEBSITE_SCRAPE_DELAY_MS = 2000; // 2s between website fetches
export const EMAIL_SEND_DELAY_MS = 1000;     // 1s between sends
