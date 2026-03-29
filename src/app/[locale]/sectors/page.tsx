import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectorIcon } from "@/components/icons";
import { IconBox } from "@/components/icon-box";
import { sectorDetails } from "@/data/sector-details";
import { SectorsHeroVisual } from "@/components/sectors-hero-visual";
import type { Metadata } from "next";

const sectorKeys = [
  "agriculture", "restaurants", "tourism", "healthcare",
  "retail", "education", "realestate", "logistics",
] as const;

const signIcons = [
  // clipboard
  <svg key="s1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  // search
  <svg key="s2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  // clock
  <svg key="s3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  // trending-down
  <svg key="s4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
  // message-x
  <svg key="s5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="9" y1="10" x2="15" y2="10"/></svg>,
  // shield-off
  <svg key="s6" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sectorsPage" });
  const pageUrl = `${BASE_URL}/${locale}/sectors`;
  return {
    title: `${t("title")} ${t("titleAccent")} — Tadnun`,
    description: t("subtitle"),
    alternates: {
      canonical: pageUrl,
      languages: { fr: `${BASE_URL}/fr/sectors`, en: `${BASE_URL}/en/sectors`, ar: `${BASE_URL}/ar/sectors` },
    },
  };
}

export default async function SectorsListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const isFr = locale === "fr";

  const signs = t.raw("sectorsPage.signs") as { title: string; body: string }[];
  const otherIndustries = t.raw("sectorsPage.otherIndustries") as string[];

  // Build slides for the hero visual
  const slides = sectorKeys.map(key => ({
    key,
    name: t(`sectors.items.${key}.name`),
    tagline: t(`sectors.items.${key}.tagline`),
    quote: t(`sectors.items.${key}.quote`),
    stats: sectorDetails[key].roi.slice(0, 3).map(r => ({
      value: r.stat,
      label: isFr || locale === "ar" ? r.label : r.labelEn,
    })),
  }));

  return (
    <PageShell>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
              {t("sectorsPage.eyebrow")}
            </p>
            <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-[4rem] leading-[1.06] tracking-tight text-foreground">
              {t("sectorsPage.title")}{" "}
              <span className="text-accent">{t("sectorsPage.titleAccent")}</span>
            </h1>
            <p className="mt-6 text-muted text-lg leading-relaxed">
              {t("sectorsPage.subtitle")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="hidden lg:block">
            <SectorsHeroVisual slides={slides} />
          </ScrollReveal>
        </div>
      </section>

      <div className="section-divide" />

      {/* ─── Pain Signals ─── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <p className="text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-4">
            {t("sectorsPage.signsEyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground max-w-2xl leading-[1.1]">
            {t("sectorsPage.signsTitle")}
          </h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {signs.map((sign, i) => (
            <ScrollReveal key={i} delay={i * 50}>
              <div className="group flex flex-col gap-4 rounded-2xl border border-border/60 bg-surface/50 p-7 transition-all duration-300 hover:border-accent/20 hover:bg-surface hover:shadow-sm h-full">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/8 text-accent transition-colors duration-300 group-hover:bg-accent/12">
                  {signIcons[i]}
                </div>
                <p className="font-semibold text-foreground text-[15px] leading-snug">{sign.title}</p>
                <p className="text-muted text-[13px] leading-relaxed">{sign.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <div className="section-divide" />

      {/* ─── Sectors Grid ─── */}
      <section id="sectors-grid" className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <p className="text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-4">
            {t("sectorsPage.gridEyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground leading-[1.1]">
            {t("sectorsPage.gridTitle")}
          </h2>
          <p className="mt-4 text-muted text-base max-w-xl">{t("sectorsPage.gridSubtitle")}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {sectorKeys.map((key, i) => {
            const details = sectorDetails[key];
            const topRoi = details?.roi?.[0];
            const quote = t(`sectors.items.${key}.quote`);
            const whyUs = details?.whyUs?.slice(0, 3) ?? [];

            return (
              <ScrollReveal key={key} delay={i * 60}>
                <a
                  href={`/${locale}/sectors/${key}`}
                  className="group flex flex-col gap-5 rounded-2xl border border-border bg-surface p-7 lg:p-8 transition-all duration-300 hover:border-foreground/15 hover:shadow-xl hover:-translate-y-0.5 h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <IconBox size="md" hoverAccent>
                        <SectorIcon sectorKey={key} size={20} />
                      </IconBox>
                      <div>
                        <h3 className="font-semibold text-foreground text-[15px] leading-tight">
                          {t(`sectors.items.${key}.name`)}
                        </h3>
                        <p className="text-[10px] text-muted font-mono tracking-wider mt-0.5">
                          {t(`sectors.items.${key}.tagline`)}
                        </p>
                      </div>
                    </div>
                    {topRoi && (
                      <div className="text-end shrink-0">
                        <span className="block text-2xl font-serif italic text-accent leading-none">{topRoi.stat}</span>
                        <span className="text-[10px] text-muted mt-0.5 block leading-tight max-w-[80px]">
                          {isFr ? topRoi.label : topRoi.labelEn}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pain quote */}
                  <blockquote className="border-s-2 border-accent/20 ps-4">
                    <p className="text-[13px] text-foreground/55 italic leading-relaxed line-clamp-2">
                      &ldquo;{quote}&rdquo;
                    </p>
                  </blockquote>

                  {/* Why us bullets */}
                  {whyUs.length > 0 && (
                    <ul className="flex flex-col gap-1.5">
                      {whyUs.map((w, j) => (
                        <li key={j} className="flex items-start gap-2 text-[12px] text-muted">
                          <svg className="shrink-0 mt-0.5 text-accent/60" width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {isFr ? w.title : w.titleEn}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA row */}
                  <div className="mt-auto pt-4 border-t border-border/50">
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent">
                      {t("sectorsPage.deepDive")}
                      <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ─── Other Industries ─── */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <ScrollReveal>
          <div className="rounded-2xl border border-border bg-surface/40 p-10 lg:p-14">
            <p className="text-[11px] font-mono tracking-[0.2em] text-accent uppercase mb-4">
              {t("sectorsPage.otherEyebrow")}
            </p>
            <h2 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-foreground max-w-lg leading-[1.15]">
              {t("sectorsPage.otherTitle")}
            </h2>
            <p className="mt-4 text-muted text-base leading-relaxed max-w-2xl">
              {t("sectorsPage.otherBody")}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {otherIndustries.map((ind, i) => (
                <span key={i} className="text-[12px] px-3 py-1.5 rounded-full border border-border/80 text-muted bg-background">
                  {ind}
                </span>
              ))}
              <span className="text-[12px] px-3 py-1.5 rounded-full border border-border/80 text-muted bg-background italic">
                + {locale === "fr" ? "votre secteur" : locale === "ar" ? "قطاعك" : "your sector"}
              </span>
            </div>
            <a
              href={`/${locale}/contact`}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 active:scale-[0.97] transition-all hover:-translate-y-px"
            >
              {t("sectorsPage.otherCta")}
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* ─── CTA Band ─── */}
      <section className="bg-foreground text-background">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <ScrollReveal>
            <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              {t("sectorsPage.ctaTitle")}
            </h2>
            <p className="mt-4 text-background/55 max-w-md mx-auto text-base leading-relaxed">
              {t("sectorsPage.ctaBody")}
            </p>
            <a
              href={`/${locale}/contact`}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-accent text-white px-10 py-4 text-[15px] font-semibold hover:bg-accent-dark active:scale-[0.97] transition-all hover:-translate-y-px shadow-lg shadow-accent/20"
            >
              {t("sectorsPage.ctaButton")}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
