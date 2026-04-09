import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { CtaBand } from "@/components/cta-band";
import { PageTracker } from "@/components/page-tracker";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getCaseStudy, getCaseStudySlugs, caseStudies } from "@/data/case-studies";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";
const LOCALES = ["fr", "en", "ar"] as const;
type Locale = (typeof LOCALES)[number];

export function generateStaticParams() {
  const slugs = getCaseStudySlugs();
  return LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  const l = locale as Locale;
  return {
    title: `${cs.title[l]} — Tadnun`,
    description: cs.description[l],
    alternates: {
      canonical: `${BASE_URL}/${locale}/case-studies/${slug}`,
      languages: Object.fromEntries(
        LOCALES.map((loc) => [loc, `${BASE_URL}/${loc}/case-studies/${slug}`])
      ),
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const l = locale as Locale;
  const t = await getTranslations({ locale });

  return (
    <PageShell>
      <PageTracker
        event="case_study_read"
        params={{ slug, locale, sector: cs.sector }}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: cs.title[l],
            description: cs.description[l],
            author: { "@type": "Organization", name: "Tadnun" },
            publisher: {
              "@type": "Organization",
              name: "Tadnun",
              url: BASE_URL,
            },
          }),
        }}
      />

      <article className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        {/* Breadcrumb */}
        <ScrollReveal>
          <nav className="flex items-center gap-2 text-[12px] text-muted mb-10">
            <a
              href={`/${locale}`}
              className="hover:text-foreground transition-colors"
            >
              {t("common.home")}
            </a>
            <span className="text-border">/</span>
            <a
              href={`/${locale}/case-studies`}
              className="hover:text-foreground transition-colors"
            >
              {t("caseStudies.breadcrumb")}
            </a>
            <span className="text-border">/</span>
            <a
              href={`/${locale}/sectors/${cs.sector}`}
              className="text-accent hover:underline"
            >
              {t(`sectors.items.${cs.sector}.name`)}
            </a>
          </nav>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <header>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5">
                {t(`sectors.items.${cs.sector}.name`)}
              </span>
              <span className="text-muted/50 text-[12px]">
                {cs.client.city}
              </span>
            </div>
            <h1 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground leading-[1.15]">
              {cs.title[l]}
            </h1>
            <p className="mt-5 text-muted text-lg leading-relaxed max-w-2xl">
              {cs.description[l]}
            </p>
          </header>
        </ScrollReveal>

        {/* Results bar */}
        <ScrollReveal delay={100}>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cs.results.map((r, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-surface/50 p-4 text-center"
              >
                <p className="font-serif italic text-2xl sm:text-3xl tracking-tight text-accent">
                  {r.value}
                </p>
                <p className="mt-1 text-[12px] text-muted leading-snug">
                  {r.label[l]}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <div className="mt-12 border-t border-border" />

        {/* Problem */}
        <ScrollReveal>
          <section className="mt-12">
            <h2 className="font-serif italic text-2xl tracking-tight mb-4">
              {t("caseStudies.problemTitle")}
            </h2>
            <p className="text-[15px] text-foreground/80 leading-relaxed">
              {cs.problem[l]}
            </p>
          </section>
        </ScrollReveal>

        {/* Solution */}
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="font-serif italic text-2xl tracking-tight mb-4">
              {t("caseStudies.solutionTitle")}
            </h2>
            <ul className="space-y-3">
              {cs.solution[l].map((step, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] text-foreground/80 leading-relaxed"
                >
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 text-accent text-[11px] font-mono flex items-center justify-center">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </section>
        </ScrollReveal>

        {/* Timeline */}
        <ScrollReveal>
          <div className="mt-8 flex items-center gap-2 text-[13px] text-muted">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="text-accent"
            >
              <circle
                cx="8"
                cy="8"
                r="7"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 4v4l3 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {t("caseStudies.timelineLabel")}: {cs.timeline[l]}
          </div>
        </ScrollReveal>

        {/* Results detail */}
        <ScrollReveal>
          <section className="mt-10">
            <h2 className="font-serif italic text-2xl tracking-tight mb-6">
              {t("caseStudies.resultsTitle")}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {cs.results.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl border border-border bg-surface/50 p-5"
                >
                  <span className="font-serif italic text-3xl tracking-tight text-accent min-w-[4rem] text-center">
                    {r.value}
                  </span>
                  <span className="text-[14px] text-foreground/80 leading-snug">
                    {r.label[l]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </ScrollReveal>

        {/* Quote */}
        <ScrollReveal>
          <blockquote className="mt-12 border-s-2 border-accent/30 ps-6 py-2">
            <p className="text-lg italic text-foreground/70 leading-relaxed">
              &ldquo;{cs.quote[l]}&rdquo;
            </p>
            <footer className="mt-3 text-[13px] text-muted">
              — {cs.client.name}, {cs.client.role[l]}, {cs.client.city}
            </footer>
          </blockquote>
        </ScrollReveal>

        {/* Other case studies */}
        <ScrollReveal>
          <section className="mt-16 pt-8 border-t border-border">
            <h3 className="font-serif italic text-xl tracking-tight mb-6">
              {t("caseStudies.otherTitle")}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {caseStudies
                .filter((other) => other.slug !== slug)
                .slice(0, 2)
                .map((other) => (
                  <a
                    key={other.slug}
                    href={`/${locale}/case-studies/${other.slug}`}
                    className="group rounded-xl border border-border bg-surface/50 p-5 hover:border-accent/30 transition-colors"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5">
                      {t(`sectors.items.${other.sector}.name`)}
                    </span>
                    <p className="mt-3 font-serif italic text-base tracking-tight text-foreground group-hover:text-accent transition-colors leading-snug">
                      {other.title[l]}
                    </p>
                    <p className="mt-2 text-[12px] text-muted">
                      {other.client.name} — {other.client.city}
                    </p>
                  </a>
                ))}
            </div>
          </section>
        </ScrollReveal>
      </article>

      <div className="section-divide" />

      <CtaBand
        titleKey="ctaBand.default.title"
        ctaKey="ctaBand.default.cta"
        descKey="ctaBand.default.desc"
        sectorKey={cs.sector}
        secondaryKey="ctaBand.default.secondary"
        secondaryHref={`/${locale}/offre`}
      />
    </PageShell>
  );
}
