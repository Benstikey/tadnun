import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
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
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "calculator" });

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-20 lg:pt-28">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
            {t("home.eyebrow")}
          </p>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight text-foreground">
            {t("home.title")}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-xl">
            {t("home.description")}
          </p>
        </ScrollReveal>
        <div className="mt-12">
          <SavingsCalculator />
        </div>
      </section>
    </PageShell>
  );
}
