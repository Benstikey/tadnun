import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { OffreHero } from "@/components/offre/offre-hero";
import { PainAgitation } from "@/components/offre/pain-agitation";
import { OffrePillars } from "@/components/offre/offre-pillars";
import { CaseStudies } from "@/components/offre/case-studies";
import { ComparisonTable } from "@/components/offre/comparison-table";
import { ProcessSteps } from "@/components/offre/process-steps";
import { PricingTransparency } from "@/components/offre/pricing-transparency";
import { FinalCta } from "@/components/offre/final-cta";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

const META: Record<string, { title: string; description: string }> = {
  fr: {
    title: "Offre Digitalisation — Tadnun",
    description: "Outils digitaux sur mesure pour les entreprises marocaines. Présence en ligne, opérations, intégrations CMI/CNSS/ONSSA. 150+ entreprises accompagnées.",
  },
  en: {
    title: "Digitalization Offer — Tadnun",
    description: "Custom digital tools for Moroccan businesses. Online presence, operations, CMI/CNSS/ONSSA integrations. 150+ businesses served.",
  },
  ar: {
    title: "عرض الرقمنة — تدنون",
    description: "أدوات رقمية مخصصة للمقاولات المغربية. حضور رقمي، عمليات، تكاملات CMI/CNSS/ONSSA. أكثر من 150 مقاولة مرافقة.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] || META.fr;
  const pageUrl = `${BASE_URL}/${locale}/offre`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/offre`,
        en: `${BASE_URL}/en/offre`,
        ar: `${BASE_URL}/ar/offre`,
      },
    },
  };
}

export default function OffrePage() {
  return (
    <PageShell>
      <OffreHero />
      <PainAgitation />
      <div className="section-divide" />
      <OffrePillars />
      <CaseStudies />
      <div className="section-divide" />
      <ComparisonTable />
      <div className="section-divide" />
      <ProcessSteps />
      <PricingTransparency />
      <FinalCta />
    </PageShell>
  );
}
