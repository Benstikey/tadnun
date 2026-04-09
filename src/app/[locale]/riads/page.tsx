import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { RiadsHero } from "@/components/riads/riads-hero";
import { RiadsMath } from "@/components/riads/riads-math";
import { RiadsSolution } from "@/components/riads/riads-solution";
import { RiadsCaseStudy } from "@/components/riads/riads-case-study";
import { RiadsObjection } from "@/components/riads/riads-objection";
import { RiadsProcess } from "@/components/riads/riads-process";
import { RiadsPricing } from "@/components/riads/riads-pricing";
import { RiadsFaq } from "@/components/riads/riads-faq";
import { RiadsFinalCta } from "@/components/riads/riads-final-cta";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "riads" });
  const pageUrl = `${BASE_URL}/${locale}/riads`;

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/riads`,
        en: `${BASE_URL}/en/riads`,
        ar: `${BASE_URL}/ar/riads`,
      },
    },
  };
}

export default function RiadsPage() {
  return (
    <PageShell>
      <RiadsHero />
      <RiadsMath />
      <RiadsSolution />
      <div className="section-divide" />
      <RiadsCaseStudy />
      <div className="section-divide" />
      <RiadsObjection />
      <div className="section-divide" />
      <RiadsProcess />
      <RiadsPricing />
      <div className="section-divide" />
      <RiadsFaq />
      <RiadsFinalCta />
    </PageShell>
  );
}
