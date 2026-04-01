const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

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
