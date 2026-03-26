import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { IntegrationHub, Vision2030Visual } from "@/components/visuals";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CtaBand } from "@/components/cta-band";
import { getSectorFromParams, type SectorKey } from "@/lib/sector-context";
import type { Metadata } from "next";

// Mapping: which founding story matches which sector
const sectorStoryMap: Partial<Record<SectorKey, "1" | "2" | "3">> = {
  agriculture: "1",  // farmer
  restaurants: "2",  // restaurant
  tourism: "3",      // riad
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return { title: `${t("title1")} ${t("title2")} — Tadnun` };
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

  // Breadcrumbs: sector-aware when param exists
  const breadcrumbItems = sectorKey
    ? [
        { label: t("nav.sectors"), href: `/${locale}/#sectors` },
        { label: sectorName!, href: `/${locale}/sectors/${sectorKey}` },
        { label: t("nav.about") },
      ]
    : [{ label: t("nav.about") }];

  // Determine which story to highlight (if any)
  const highlightedStory = sectorKey ? sectorStoryMap[sectorKey] ?? null : null;

  // Reorder stories: highlighted one first
  const storyOrder: ("1" | "2" | "3")[] = highlightedStory
    ? [highlightedStory, ...((["1", "2", "3"] as const).filter((n) => n !== highlightedStory))]
    : ["1", "2", "3"];

  return (
    <PageShell>
      {/* Hero */}
      <section aria-labelledby="about-heading" className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <Breadcrumbs items={breadcrumbItems} />

        <p className="text-accent text-xs font-mono tracking-widest mb-2">
          {t("aboutPage.eyebrow")}
        </p>
        <h1 id="about-heading" className="font-serif italic text-4xl sm:text-6xl tracking-tight text-foreground leading-[1.1]">
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
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <ScrollReveal>
          <p className="text-section-num text-xs font-mono tracking-widest mb-2">
            {t("aboutPage.problemEyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground">
            {t("aboutPage.problemTitle")}
          </h2>
        </ScrollReveal>

        <div className="mt-16 space-y-16">
          {storyOrder.map((num, i) => {
            const isHighlighted = highlightedStory === num;
            return (
              <ScrollReveal key={num} delay={i * 100}>
                <div
                  className={`max-w-2xl ${
                    isHighlighted
                      ? "rounded-xl border border-accent/20 bg-accent/[0.03] p-6 -ms-6"
                      : ""
                  }`}
                >
                  <span
                    className={`text-xs font-mono ${
                      isHighlighted ? "text-accent" : "text-section-num"
                    }`}
                  >
                    0{num}
                  </span>
                  <h3 className="mt-2 text-foreground font-medium text-xl">
                    {t(`aboutPage.problem${num}Title`)}
                  </h3>
                  <p className="mt-3 text-muted text-[15px] leading-relaxed">
                    {t(`aboutPage.problem${num}Body`)}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <div className="border-t border-border" />

      {/* What Tadnun Does Differently + Integration Hub */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div>
              <p className="text-accent text-xs font-mono tracking-widest mb-2">
                {t("aboutPage.differenceEyebrow")}
              </p>
              <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground">
                {t("aboutPage.differenceTitle")}
              </h2>
              <p className="mt-6 text-muted text-[15px] leading-relaxed">
                {t("aboutPage.differenceBody")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <IntegrationHub isFr={isFr} />
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
              <p className="text-background/40 text-xs font-mono tracking-widest mb-2">
                {t("aboutPage.visionEyebrow")}
              </p>
              <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight">
                {t("aboutPage.visionTitle")}
              </h2>
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
          <p className="text-section-num text-xs font-mono tracking-widest mb-2">
            {t("aboutPage.valuesEyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground">
            {t("aboutPage.valuesTitle")}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-12">
          {(["1", "2", "3", "4"] as const).map((num, i) => (
            <ScrollReveal key={num} delay={i * 80}>
              <div>
                <h3 className="text-foreground font-medium text-lg">
                  {t(`aboutPage.value${num}Title`)}
                </h3>
                <p className="mt-2 text-muted text-[15px] leading-relaxed">
                  {t(`aboutPage.value${num}Body`)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="border-t border-border" />

      <CtaBand titleKey="ctaBand.about.title" ctaKey="ctaBand.about.cta" sectorKey={sectorKey} />
    </PageShell>
  );
}
