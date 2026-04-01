const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

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
