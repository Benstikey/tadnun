import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import type { Metadata } from "next";
import { SavingsCalculator } from "@/components/calculator/savings-calculator";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculator" });
  const pageUrl = `${BASE_URL}/${locale}/calculator`;

  return {
    title: `${t("metaTitle")} — Tadnun`,
    description: t("metaDescription"),
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/calculator`,
        en: `${BASE_URL}/en/calculator`,
        ar: `${BASE_URL}/ar/calculator`,
      },
    },
  };
}

export default async function CalculatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <SavingsCalculator />
      </section>
    </PageShell>
  );
}
