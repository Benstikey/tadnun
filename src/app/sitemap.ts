import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";
const LOCALES = ["fr", "en", "ar"] as const;

const SECTORS = [
  "agriculture",
  "restaurants",
  "tourism",
  "healthcare",
  "retail",
  "education",
  "realestate",
  "logistics",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = ["", "/approach", "/about", "/contact", "/sectors", "/tools/quiz", "/blog", "/compare"];

  for (const page of staticPages) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  // Sector detail pages
  for (const sector of SECTORS) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/sectors/${sector}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}/sectors/${sector}`])
          ),
        },
      });
    }
  }

  return entries;
}
