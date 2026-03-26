import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ApproachTimeline, AnimatedStat } from "@/components/visuals";
import { BeforeAfterRow } from "@/components/before-after-row";
import { ExpertiseIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CtaBand } from "@/components/cta-band";
import { getSectorFromParams, type SectorKey } from "@/lib/sector-context";
import { sectorDetails } from "@/data/sector-details";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "approachPage" });
  return { title: `${t("title")} — Tadnun` };
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

  // Breadcrumbs: sector-aware when param exists
  const breadcrumbItems = sectorKey
    ? [
        { label: t("nav.sectors"), href: `/${locale}/#sectors` },
        { label: sectorName!, href: `/${locale}/sectors/${sectorKey}` },
        { label: t("nav.approach") },
      ]
    : [{ label: t("nav.approach") }];

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
      <section aria-labelledby="approach-heading" className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <Breadcrumbs items={breadcrumbItems} />

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
          <p className="text-accent text-xs font-mono tracking-widest mb-2">
            {t("transformation.eyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground">
            {t("transformation.title")}
          </h2>
          <p className="mt-4 text-muted max-w-lg">
            {t("transformation.subtitle")}
          </p>
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
          <p className="text-section-num text-xs font-mono tracking-widest mb-2">
            {t("approach.eyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground">
            {t("approach.title")}
          </h2>
        </ScrollReveal>

        <ApproachTimeline steps={timelineSteps} />
      </section>

      <div className="border-t border-border" />

      {/* Why Tadnun */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <ScrollReveal>
          <p className="text-section-num text-xs font-mono tracking-widest mb-2">
            {t("expertise.eyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground">
            {t("expertise.title")}
          </h2>
          <p className="mt-4 text-muted max-w-lg">
            {t("expertise.subtitle")}
          </p>
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

      <div className="border-t border-border" />

      <CtaBand titleKey="ctaBand.approach.title" ctaKey="ctaBand.approach.cta" sectorKey={sectorKey} />
    </PageShell>
  );
}
