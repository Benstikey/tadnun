const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

const SECTORS = [
  "Agriculture & Cooperatives",
  "Restaurants & Cafes",
  "Tourism & Hospitality",
  "Healthcare & Clinics",
  "Retail & Commerce",
  "Education & Training",
  "Real Estate",
  "Logistics & Transport",
];

export function JsonLd({ locale }: { locale: string }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tadnun",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.svg`,
    description:
      locale === "fr"
        ? "Tadnun aide les entreprises marocaines à se digitaliser avec des outils modernes et des solutions digitales sur mesure."
        : locale === "ar"
          ? "تدنون تساعد المقاولات المغربية على التحول الرقمي بأدوات حديثة وحلول رقمية مخصصة."
          : "Tadnun helps Moroccan businesses digitalize with modern tools, websites, apps, and tailored digital solutions.",
    email: "contact@tadnun.ma",
    telephone: "+212632431557",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Casablanca",
      addressRegion: "Casablanca-Settat",
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    sameAs: [
      "https://www.linkedin.com/company/tadnun",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+212632431557",
        contactType: "sales",
        availableLanguage: ["French", "English", "Arabic"],
      },
      {
        "@type": "ContactPoint",
        url: "https://wa.me/212632431557",
        contactType: "customer support",
        availableLanguage: ["French", "Arabic"],
      },
    ],
    knowsAbout: SECTORS,
    knowsLanguage: ["fr", "en", "ar"],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tadnun",
    url: BASE_URL,
    telephone: "+212632431557",
    email: "contact@tadnun.ma",
    description:
      "Digital transformation solutions for Moroccan businesses — custom software, websites, and apps tailored to local sectors.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
      addressLocality: "Casablanca",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.5731,
      longitude: -7.5898,
    },
    areaServed: [
      { "@type": "Country", name: "Morocco" },
      { "@type": "City", name: "Casablanca" },
      { "@type": "City", name: "Rabat" },
      { "@type": "City", name: "Marrakech" },
      { "@type": "City", name: "Tanger" },
      { "@type": "City", name: "Fès" },
      { "@type": "City", name: "Agadir" },
    ],
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Transformation Services",
      itemListElement: SECTORS.map((sector) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `Digital Solutions for ${sector}`,
          areaServed: { "@type": "Country", name: "Morocco" },
        },
      })),
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tadnun",
    url: BASE_URL,
    inLanguage: ["fr", "en", "ar"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

/**
 * Homepage FAQ schema — renders FAQPage JSON-LD from translation data.
 */
export function HomeFaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

/**
 * Sector page schemas — FAQPage + BreadcrumbList + Service.
 */
export function SectorJsonLd({
  locale,
  sectorSlug,
  sectorName,
  sectorDescription,
  faqItems,
}: {
  locale: string;
  sectorSlug: string;
  sectorName: string;
  sectorDescription: string;
  faqItems: { question: string; answer: string }[];
}) {
  const sectorUrl = `${BASE_URL}/${locale}/sectors/${sectorSlug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tadnun",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "Secteurs" : locale === "ar" ? "القطاعات" : "Sectors",
        item: `${BASE_URL}/${locale}/sectors`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: sectorName,
        item: sectorUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Tadnun — ${sectorName}`,
    description: sectorDescription,
    url: sectorUrl,
    provider: {
      "@type": "Organization",
      name: "Tadnun",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    serviceType: "Digital Transformation",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}

/**
 * Blog article schema — BlogPosting + BreadcrumbList.
 */
export function BlogPostJsonLd({
  locale,
  slug,
  title,
  description,
  date,
  sector,
}: {
  locale: string;
  slug: string;
  title: string;
  description: string | null;
  date: string | null;
  sector: string | null;
}) {
  const articleUrl = `${BASE_URL}/${locale}/blog/${slug}`;

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description || title,
    url: articleUrl,
    datePublished: date || new Date().toISOString(),
    dateModified: date || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "Tadnun",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Tadnun",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    inLanguage: locale,
    ...(sector && { articleSection: sector }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tadnun",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

/**
 * Compare page schema — Article + BreadcrumbList.
 */
export function ComparePageJsonLd({
  locale,
  slug,
  title,
  description,
}: {
  locale: string;
  slug: string;
  title: string;
  description: string | null;
}) {
  const pageUrl = `${BASE_URL}/${locale}/compare/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description || title,
    url: pageUrl,
    author: {
      "@type": "Organization",
      name: "Tadnun",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Tadnun",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
      },
    },
    inLanguage: locale,
    articleSection: "Comparisons",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Tadnun",
        item: `${BASE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "Comparaisons" : locale === "ar" ? "المقارنات" : "Comparisons",
        item: `${BASE_URL}/${locale}/compare`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
