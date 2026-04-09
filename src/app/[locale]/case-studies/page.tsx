import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { CtaBand } from "@/components/cta-band";
import { PageTracker } from "@/components/page-tracker";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { caseStudies } from "@/data/case-studies";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";
const LOCALES = ["fr", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "caseStudies" });
  return {
    title: `${t("metaTitle")} — Tadnun`,
    description: t("metaDescription"),
    alternates: {
      canonical: `${BASE_URL}/${locale}/case-studies`,
      languages: Object.fromEntries(
        LOCALES.map((l) => [l, `${BASE_URL}/${l}/case-studies`])
      ),
    },
  };
}

export default async function CaseStudiesListPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const l = locale as Locale;
  const t = await getTranslations({ locale });

  return (
    <PageShell>
      <PageTracker event="case_studies_list" params={{ locale }} />

      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <ScrollReveal>
          <SectionHeading
            as="h1"
            eyebrow={t("caseStudies.eyebrow")}
            title={t.rich("caseStudies.title", {
              accent: (chunks) => (
                <span className="text-accent">{chunks}</span>
              ),
            })}
            subtitle={t("caseStudies.subtitle")}
          />
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs, idx) => (
            <ScrollReveal key={cs.slug} delay={idx * 80}>
              <a
                href={`/${locale}/case-studies/${cs.slug}`}
                className="group rounded-2xl border border-border bg-surface/50 p-6 sm:p-7 h-full flex flex-col hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5">
                    {t(`sectors.items.${cs.sector}.name`)}
                  </span>
                  <span className="text-muted/50 text-[12px]">
                    {cs.client.city}
                  </span>
                </div>

                <h2 className="font-serif italic text-lg tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                  {cs.title[l]}
                </h2>

                <p className="mt-3 text-muted text-[13px] leading-relaxed flex-1">
                  {cs.description[l]}
                </p>

                {/* Top 2 results */}
                <div className="mt-5 flex gap-4">
                  {cs.results.slice(0, 2).map((r, i) => (
                    <div key={i}>
                      <p className="font-serif italic text-xl tracking-tight text-accent">
                        {r.value}
                      </p>
                      <p className="text-[11px] text-muted leading-snug">
                        {r.label[l]}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[12px] text-muted">
                    {cs.client.name}, {cs.client.role[l]}
                  </span>
                  <span className="text-accent text-[12px] font-medium group-hover:underline">
                    {t("caseStudies.readMore")} →
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divide" />

      <CtaBand
        titleKey="ctaBand.default.title"
        ctaKey="ctaBand.default.cta"
        descKey="ctaBand.default.desc"
        secondaryKey="ctaBand.default.secondary"
        secondaryHref={`/${locale}/offre`}
      />
    </PageShell>
  );
}
