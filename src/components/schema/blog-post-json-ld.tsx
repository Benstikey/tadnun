const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

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
