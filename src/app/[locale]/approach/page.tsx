import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { ApproachTimeline, AnimatedStat } from "@/components/visuals";
import { BeforeAfterRow } from "@/components/before-after-row";
import { ExpertiseIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { getSectorFromParams, type SectorKey } from "@/lib/sector-context";
import { sectorDetails } from "@/data/sector-details";
import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "approachPage" });
  const pageUrl = `${BASE_URL}/${locale}/approach`;
  return {
    title: `${t("title")} — Tadnun`,
    description: t("subtitle"),
    alternates: {
      canonical: pageUrl,
      languages: { fr: `${BASE_URL}/fr/approach`, en: `${BASE_URL}/en/approach`, ar: `${BASE_URL}/ar/approach` },
    },
  };
}

export default async function ApproachPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale });
  const isEn = locale === "en";

  const sectorKey = getSectorFromParams(resolvedSearchParams);
  const details = sectorKey ? sectorDetails[sectorKey] : null;
  const sectorName = sectorKey ? t(`sectors.items.${sectorKey}.name`) : null;
  const sectorSuffix = sectorKey ? `?sector=${sectorKey}` : "";

  // Before/After data: sector-specific or generic
  const workflowData = details
    ? details.workflows.map((w, i) => ({
        key: i,
        before: isEn ? w.beforeEn : w.before,
        after: isEn ? w.afterEn : w.after,
      }))
    : [1, 2, 3, 4, 5, 6].map((i) => ({
        key: i,
        before: t(`transformation.items.before${i}`),
        after: t(`transformation.items.after${i}`),
      }));

  // Timeline steps: keep titles from translations, swap body when sector exists
  const timelineSteps = (["understand", "build", "grow"] as const).map((step) => ({
    num: t(`approach.steps.${step}.num`),
    title: t(`approach.steps.${step}.title`),
    body: details
      ? isEn
        ? details.approachSteps[step].bodyEn
        : details.approachSteps[step].body
      : t(`approach.steps.${step}.body`),
  }));

  // Why Tadnun: sector-specific or generic
  const whyUsItems = details
    ? details.whyUs.map((item, i) => ({
        key: i,
        title: isEn ? item.titleEn : item.title,
        body: isEn ? item.bodyEn : item.body,
      }))
    : null;

  return (
    <PageShell>
      <section aria-labelledby="approach-heading" className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        <p className="text-accent text-xs font-mono tracking-widest mb-2">
          {t("approachPage.eyebrow")}
        </p>
        <h1 id="approach-heading" className="font-serif italic text-4xl sm:text-6xl tracking-tight text-foreground">
          {t("approachPage.title")}
        </h1>
        <p className="mt-6 text-muted text-lg max-w-xl leading-relaxed">
          {sectorKey && sectorName
            ? t("approachPage.sectorSubtitle", { sector: sectorName })
            : t("approachPage.subtitle")}
        </p>
      </section>

      <div className="border-t border-border" />

      {/* Transformation Before/After */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("transformation.eyebrow")}
            title={t("transformation.title")}
            subtitle={t("transformation.subtitle")}
          />
        </ScrollReveal>

        <div className="mt-14 space-y-4">
          {workflowData.map((item, i) => (
            <BeforeAfterRow
              key={item.key}
              before={item.before}
              after={item.after}
              delay={(i + 1) * 120}
            />
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* 3-Step Approach */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("approach.eyebrow")}
            title={t("approach.title")}
          />
        </ScrollReveal>

        <ApproachTimeline steps={timelineSteps} />
      </section>

      <div className="border-t border-border" />

      {/* Why Tadnun */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("expertise.eyebrow")}
            title={t("expertise.title")}
            subtitle={t("expertise.subtitle")}
          />
        </ScrollReveal>

        <div className="mt-16 grid sm:grid-cols-2 gap-8">
          {whyUsItems
            ? whyUsItems.map((item, i) => (
                <ScrollReveal key={item.key} delay={i * 80}>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/55">
                      <span className="text-sm font-medium">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-[15px]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-muted text-[14px] leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            : (["local", "simple", "support", "price"] as const).map((key, i) => (
                <ScrollReveal key={key} delay={i * 80}>
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-foreground/5 flex items-center justify-center text-foreground/55">
                      <ExpertiseIcon itemKey={key} size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground text-[15px]">
                        {t(`expertise.items.${key}.title`)}
                      </h3>
                      <p className="mt-1.5 text-muted text-[14px] leading-relaxed">
                        {t(`expertise.items.${key}.body`)}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
        </div>
      </section>

      {/* ─── Your Investment ─── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("pricing.eyebrow")}
            title={t("pricing.title")}
          />
          <p className="mt-4 text-muted text-base leading-relaxed max-w-xl">
            {t("pricing.subtitle")}
          </p>
        </ScrollReveal>

        {/* Pillars */}
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {(["tailored", "transparent", "flexible"] as const).map((key, i) => (
            <ScrollReveal key={key} delay={i * 80}>
              <div className="rounded-2xl border border-border bg-surface p-6 h-full">
                <span className="text-2xl">{t(`pricing.pillars.${key}.icon`)}</span>
                <h3 className="mt-3 font-semibold text-foreground text-[15px]">
                  {t(`pricing.pillars.${key}.title`)}
                </h3>
                <p className="mt-2 text-muted text-[14px] leading-relaxed">
                  {t(`pricing.pillars.${key}.body`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Cost of inaction */}
        <ScrollReveal>
          <div className="mt-12 rounded-2xl border border-accent/15 bg-accent/[0.03] p-8">
            <h3 className="font-serif italic text-xl text-foreground">
              {t("pricing.costOfInaction.title")}
            </h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {(["contracts", "commissions", "noshows"] as const).map((key) => (
                <div key={key}>
                  <span className="block text-2xl font-serif italic text-accent">
                    {t(`pricing.costOfInaction.items.${key}.value`)}
                  </span>
                  <span className="mt-1 block text-[13px] text-muted">
                    {t(`pricing.costOfInaction.items.${key}.label`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Process */}
        <ScrollReveal>
          <div className="mt-12">
            <h3 className="font-semibold text-foreground text-base">
              {t("pricing.process.title")}
            </h3>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {([1, 2, 3] as const).map((n) => (
                <div key={n} className="flex items-start gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center text-[12px] font-semibold text-foreground/60">
                    {n}
                  </span>
                  <p className="text-[14px] text-muted leading-relaxed pt-0.5">
                    {t(`pricing.process.step${n}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={`/${locale}/contact${sectorSuffix}`}
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/25 hover:bg-accent/90 active:scale-[0.97] transition-all duration-150 hover:-translate-y-px"
            >
              {t("pricing.cta")}
            </a>
            <p className="text-[13px] text-muted">{t("pricing.note")}</p>
          </div>
        </ScrollReveal>
      </section>

      <div className="border-t border-border" />

      <CtaBand
        titleKey="ctaBand.approach.title"
        ctaKey="ctaBand.approach.cta"
        descKey="ctaBand.approach.desc"
        secondaryKey="ctaBand.approach.secondary"
        secondaryHref={`/${locale}/sectors`}
        sectorKey={sectorKey}
      />
    </PageShell>
  );
}
