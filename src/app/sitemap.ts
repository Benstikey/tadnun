import type { MetadataRoute } from "next";
import { cities } from "@/data/cities";
import { getBlogPosts } from "@/lib/blog";
import { getComparePages } from "@/lib/compare";
import { getCaseStudySlugs } from "@/data/case-studies";

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPages = ["", "/approach", "/about", "/contact", "/sectors", "/tools/quiz", "/blog", "/compare", "/resources", "/offre", "/calculator", "/case-studies", "/riads"];

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

  // Sector x City pages (programmatic SEO)
  for (const city of cities) {
    for (const sector of city.strongSectors) {
      for (const locale of LOCALES) {
        entries.push({
          url: `${BASE_URL}/${locale}/sectors/${sector}/${city.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
          alternates: {
            languages: Object.fromEntries(
              LOCALES.map((l) => [l, `${BASE_URL}/${l}/sectors/${sector}/${city.slug}`])
            ),
          },
        });
      }
    }
  }

  // Blog articles
  for (const locale of LOCALES) {
    const posts = await getBlogPosts(locale);
    for (const post of posts) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Comparison pages
  for (const locale of LOCALES) {
    const pages = getComparePages(locale);
    for (const page of pages) {
      entries.push({
        url: `${BASE_URL}/${locale}/compare/${page.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Case study pages
  const caseStudySlugs = getCaseStudySlugs();
  for (const slug of caseStudySlugs) {
    for (const locale of LOCALES) {
      entries.push({
        url: `${BASE_URL}/${locale}/case-studies/${slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((l) => [l, `${BASE_URL}/${l}/case-studies/${slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
