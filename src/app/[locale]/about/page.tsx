import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Vision2030Visual } from "@/components/visuals";
import { SectorIntegrationHub } from "@/components/integration-hub";
import { RealityVisual } from "@/components/reality-visual";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CtaBand } from "@/components/cta-band";
import { SectionHeading } from "@/components/section-heading";
import { getSectorFromParams, type SectorKey } from "@/lib/sector-context";
import type { Metadata } from "next";

// Mapping: which founding story matches which sector
const sectorStoryMap: Partial<Record<SectorKey, "1" | "2" | "3">> = {
  agriculture: "1",  // farmer
  restaurants: "2",  // restaurant
  tourism: "3",      // riad
};

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const pageUrl = `${BASE_URL}/${locale}/about`;
  return {
    title: `${t("title1")} ${t("title2")} — Tadnun`,
    description: t("intro"),
    alternates: {
      canonical: pageUrl,
      languages: { fr: `${BASE_URL}/fr/about`, en: `${BASE_URL}/en/about`, ar: `${BASE_URL}/ar/about` },
    },
  };
}

export default async function AboutPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations({ locale });
  const isFr = locale === "fr";

  const sectorKey = getSectorFromParams(resolvedSearchParams);
  const sectorName = sectorKey ? t(`sectors.items.${sectorKey}.name`) : null;

  // Determine which story to highlight (if any)
  const highlightedStory = sectorKey ? sectorStoryMap[sectorKey] ?? null : null;

  // Reorder stories: highlighted one first
  const storyOrder: ("1" | "2" | "3")[] = highlightedStory
    ? [highlightedStory, ...((["1", "2", "3"] as const).filter((n) => n !== highlightedStory))]
    : ["1", "2", "3"];

  return (
    <PageShell>
      {/* Hero */}
      <section aria-labelledby="about-heading" className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-16">
        <p className="text-accent text-xs font-mono tracking-widest mb-2">
          {t("aboutPage.eyebrow")}
        </p>
        <h1 id="about-heading" className="font-serif italic text-4xl sm:text-5xl tracking-tight text-foreground leading-[1.1]">
          {t("aboutPage.title1")}
          <br />
          {t("aboutPage.title2")}
        </h1>
        <p className="mt-8 text-muted text-lg leading-relaxed max-w-2xl">
          {t("aboutPage.intro")}
        </p>
      </section>

      <div className="border-t border-border" />

      {/* The Problem We Saw */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
          {/* Left: stories */}
          <div className="lg:col-span-7">
            <ScrollReveal>
              <SectionHeading
                eyebrow={t("aboutPage.problemEyebrow")}
                title={t("aboutPage.problemTitle")}
              />
            </ScrollReveal>

            <div className="mt-14 space-y-10">
              {storyOrder.map((num, i) => {
                const isHighlighted = highlightedStory === num;
                return (
                  <ScrollReveal key={num} delay={i * 100}>
                    <div
                      className={`relative ps-6 ${
                        isHighlighted
                          ? "border-s-2 border-accent"
                          : "border-s border-border"
                      }`}
                    >
                      <h3 className={`font-medium text-lg leading-snug ${
                        isHighlighted ? "text-accent" : "text-foreground"
                      }`}>
                        {t(`aboutPage.problem${num}Title`)}
                      </h3>
                      <p className="mt-2.5 text-muted text-[14px] leading-relaxed">
                        {t(`aboutPage.problem${num}Body`)}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* Right: reality visual */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <ScrollReveal delay={200}>
              <RealityVisual
                labels={{
                  lostContracts: t("aboutPage.realityLostContracts"),
                  lostContractsValue: t("aboutPage.realityLostContractsValue"),
                  zeroPresence: t("aboutPage.realityZeroPresence"),
                  zeroPresenceValue: t("aboutPage.realityZeroPresenceValue"),
                  commissions: t("aboutPage.realityCommissions"),
                  commissionsValue: t("aboutPage.realityCommissionsValue"),
                  paperTrail: t("aboutPage.realityPaperTrail"),
                }}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* What Tadnun Does Differently + Integration Hub */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <SectionHeading
                eyebrow={t("aboutPage.differenceEyebrow")}
                title={t("aboutPage.differenceTitle")}
              />
              <p className="mt-6 text-muted text-[15px] leading-relaxed">
                {t("aboutPage.differenceBody")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <SectorIntegrationHub
              integrations={[]}
              connectedLabel={t("aboutPage.differenceEyebrow")}
            />
          </ScrollReveal>
        </div>
      </section>

      <div className="border-t border-border" />

      {/* Morocco 2030 Vision */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <SectionHeading
                eyebrow={t("aboutPage.visionEyebrow")}
                title={t("aboutPage.visionTitle")}
                eyebrowColor="muted"
              />
              <p className="mt-6 text-background/70 max-w-md text-base leading-relaxed">
                {t("aboutPage.visionBody")}
              </p>
            </div>

            {/* Right: animated visual */}
            <div className="flex justify-center">
              <Vision2030Visual isFr={isFr} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("aboutPage.valuesEyebrow")}
            title={t("aboutPage.valuesTitle")}
          />
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {([
            { num: "1" as const, icon: <ProximityIcon /> },
            { num: "2" as const, icon: <SimplicityIcon /> },
            { num: "3" as const, icon: <ImpactIcon /> },
            { num: "4" as const, icon: <HonestyIcon /> },
          ]).map(({ num, icon }, i) => (
            <ScrollReveal key={num} delay={i * 80}>
              <div className="group relative rounded-2xl border border-border bg-surface p-7 h-full transition-all duration-300 hover:border-foreground/12 hover:shadow-md">
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-accent/[0.07] flex items-center justify-center text-accent/70 mb-5 transition-colors duration-200 group-hover:bg-accent/10 group-hover:text-accent">
                  {icon}
                </div>
                <h3 className="text-foreground font-semibold text-[17px] leading-snug">
                  {t(`aboutPage.value${num}Title`)}
                </h3>
                <p className="mt-2.5 text-muted text-[14px] leading-relaxed">
                  {t(`aboutPage.value${num}Body`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      <CtaBand
        titleKey="ctaBand.about.title"
        ctaKey="ctaBand.about.cta"
        descKey="ctaBand.about.desc"
        secondaryKey="ctaBand.about.secondary"
        secondaryHref={`/${locale}/approach`}
        sectorKey={sectorKey}
      />
    </PageShell>
  );
}

/* ── Value icons ── */

function ProximityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function SimplicityIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

function ImpactIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

function HonestyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
