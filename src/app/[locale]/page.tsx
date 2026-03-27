import { useTranslations, useLocale } from "next-intl";
import { SectorIcon } from "@/components/icons";
import { IconBox } from "@/components/icon-box";
import { UrgencyRace } from "@/components/visuals";
import { HeroDashboard } from "@/components/hero-dashboard";
import { CtaBand } from "@/components/cta-band";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FaqSection } from "@/components/faq";
import { sectorDetails } from "@/data/sector-details";

const sectorKeys = [
  "agriculture", "restaurants", "tourism", "healthcare",
  "retail", "education", "realestate", "logistics",
] as const;

export default function Home() {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <PageShell>
      {/* ─── Hero ─── */}
      <section aria-labelledby="hero-heading" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 lg:pt-28 lg:pb-20">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            {/* Left: headline */}
            <div className="lg:col-span-7">
              <p className="hero-stagger hero-stagger-1 text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
                {t("hero.eyebrow")}
              </p>
              <h1 id="hero-heading" className="hero-stagger hero-stagger-2 font-serif italic text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.06] tracking-tight text-foreground">
                {t("hero.title1")}{" "}
                <span className="text-accent">{t("hero.title2")}</span>{" "}
                {t("hero.title3")}
              </h1>
              <p className="hero-stagger hero-stagger-3 mt-8 text-muted text-lg leading-relaxed max-w-lg">
                {t("hero.description")}
              </p>
              <div className="hero-stagger hero-stagger-4 mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={`/${locale}/sectors`}
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background hover:bg-foreground/90 active:scale-[0.97] transition-all hover:-translate-y-px shadow-sm"
                >
                  {t("common.exploreSectors")}
                </a>
                <a
                  href={`/${locale}/contact`}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all"
                >
                  {t("nav.cta")}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Right: app preview */}
            <div className="lg:col-span-5">
              <HeroDashboard
                labels={{
                  projects: t("hero.mock.projects"),
                  activeProjects: t("hero.mock.activeProjects"),
                  sectors: t("hero.mock.sectors"),
                  completion: t("hero.mock.completion"),
                  projectList: t("hero.mock.projectList"),
                  viewAll: t("hero.mock.viewAll"),
                  live: t("hero.mock.live"),
                  statusActive: t("hero.mock.statusActive"),
                  statusReview: t("hero.mock.statusReview"),
                  statusComplete: t("hero.mock.statusComplete"),
                  projTraceability: t("hero.mock.projTraceability"),
                  projTraceabilityClient: t("hero.mock.projTraceabilityClient"),
                  projBooking: t("hero.mock.projBooking"),
                  projBookingClient: t("hero.mock.projBookingClient"),
                  projInventory: t("hero.mock.projInventory"),
                  projInventoryClient: t("hero.mock.projInventoryClient"),
                  projPatient: t("hero.mock.projPatient"),
                  projPatientClient: t("hero.mock.projPatientClient"),
                  milestoneDeployed: t("hero.mock.milestoneDeployed"),
                  milestoneTraining: t("hero.mock.milestoneTraining"),
                }}
              />
            </div>
          </div>
        </div>
        {/* Subtle accent line at bottom of hero */}
        <div className="section-divide" />
      </section>

      {/* ─── Sectors ─── */}
      <section id="sectors" aria-labelledby="sectors-heading" className="mx-auto max-w-6xl px-6 pt-24 pb-24">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 max-w-full">
            <div className="max-w-2xl">
              <h2 id="sectors-heading" className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1]">
                {t("sectors.title")}
              </h2>
              <p className="mt-5 text-muted text-base max-w-lg leading-relaxed">
                {t("sectors.subtitle")}
              </p>
            </div>
            <a
              href={`/${locale}/sectors`}
              className="group inline-flex items-center gap-2 shrink-0 text-sm font-semibold text-foreground border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all"
            >
              {t("common.exploreSectors")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </ScrollReveal>

        {/* Featured sectors — 2 lead cards with more detail */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {sectorKeys.slice(0, 2).map((key, i) => {
            const details = sectorDetails[key];
            const topRoi = details?.roi?.[0];
            const testimonial = details?.testimonials?.[0];

            return (
              <ScrollReveal key={key} delay={i * 80}>
                <a
                  href={`/${locale}/sectors/${key}`}
                  className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-surface p-8 lg:p-10 transition-all duration-300 hover:border-foreground/15 hover:shadow-lg hover:-translate-y-0.5 h-full"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg leading-tight">
                        {t(`sectors.items.${key}.name`)}
                      </h3>
                      <p className="text-[11px] text-muted font-mono tracking-wider mt-1.5">
                        {t(`sectors.items.${key}.tagline`)}
                      </p>
                    </div>
                    <IconBox size="lg" hoverAccent>
                      <SectorIcon sectorKey={key} size={22} />
                    </IconBox>
                  </div>

                  <p className="text-foreground/65 text-[14px] leading-relaxed">
                    {t(`sectors.items.${key}.pain`)}
                  </p>

                  {/* Testimonial — only on featured cards */}
                  {testimonial && (
                    <blockquote className="border-s-2 border-accent/25 ps-4 py-1">
                      <p className="text-[13px] text-foreground/50 leading-relaxed italic line-clamp-2">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <cite className="mt-1.5 block text-[11px] text-muted not-italic">
                        {testimonial.name}, {testimonial.city}
                      </cite>
                    </blockquote>
                  )}

                  <div className="mt-auto pt-4 border-t border-border/60 flex items-end justify-between gap-4">
                    {topRoi && (
                      <div>
                        <span className="text-2xl font-serif italic text-accent">{topRoi.stat}</span>
                        <span className="text-[11px] text-muted ms-2">{locale === "en" ? topRoi.labelEn : topRoi.label}</span>
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent whitespace-nowrap shrink-0">
                      {t("common.learnMore")}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </a>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Remaining sectors — compact grid */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectorKeys.slice(2).map((key, i) => {
            const details = sectorDetails[key];
            const topRoi = details?.roi?.[0];

            return (
              <ScrollReveal key={key} delay={i * 40}>
                <a
                  href={`/${locale}/sectors/${key}`}
                  className="group relative flex flex-col gap-3 rounded-xl border border-border/80 bg-surface/60 p-6 transition-all duration-300 hover:border-foreground/15 hover:bg-surface hover:shadow-md hover:-translate-y-0.5 h-full"
                >
                  <div className="flex items-center gap-3">
                    <IconBox size="sm" hoverAccent>
                      <SectorIcon sectorKey={key} size={18} />
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

                  <p className="text-foreground/60 text-[13px] leading-relaxed line-clamp-2">
                    {t(`sectors.items.${key}.pain`)}
                  </p>

                  {topRoi && (
                    <div className="pt-3 border-t border-border/50">
                      <span className="text-lg font-serif italic text-accent">{topRoi.stat}</span>
                      <span className="text-[10px] text-muted ms-1.5">{locale === "en" ? topRoi.labelEn : topRoi.label}</span>
                    </div>
                  )}

                  <span className="mt-auto inline-flex items-center gap-1 text-[11px] font-semibold text-accent whitespace-nowrap">
                    {t("common.learnMore")}
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </a>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ─── Urgency — full-bleed dark section ─── */}
      <section aria-labelledby="urgency-heading" className="bg-foreground text-background relative grain">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: messaging */}
            <div>
              <p className="text-[11px] font-mono tracking-[0.2em] text-background/35 uppercase mb-4">
                {t("urgency.eyebrow")}
              </p>
              <h2 id="urgency-heading" className="font-serif italic text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight leading-[1.12]">
                {t("urgency.title")}
              </h2>
              <p className="mt-5 text-background/60 max-w-md text-base leading-relaxed">
                {t("urgency.description")}
              </p>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-background/10 bg-background/[0.04] p-5">
                  <span className="block text-4xl sm:text-5xl font-serif italic text-accent leading-none">{t("urgency.stat1")}</span>
                  <span className="mt-3 block text-[13px] text-background/50 leading-snug">
                    {t("urgency.stat1Label")}
                  </span>
                </div>
                <div className="rounded-xl border border-background/10 bg-background/[0.04] p-5">
                  <span className="block text-4xl sm:text-5xl font-serif italic text-background leading-none">{t("urgency.stat2")}</span>
                  <span className="mt-3 block text-[13px] text-background/50 leading-snug">
                    {t("urgency.stat2Label")}
                  </span>
                </div>
              </div>

              <a
                href={`/${locale}/contact`}
                className="mt-10 inline-flex items-center justify-center rounded-full bg-accent text-white px-8 py-3.5 text-sm font-semibold hover:bg-accent-dark active:scale-[0.97] transition-all hover:-translate-y-px shadow-lg shadow-accent/20"
              >
                {t("urgency.cta")}
              </a>
            </div>

            {/* Right: race visualization */}
            <div>
              <UrgencyRace
                labels={{
                  competitors: t("urgency.competitors"),
                  yourBusiness: t("urgency.yourBusiness"),
                  punchline: t("urgency.punchline"),
                  avgLabel: t("urgency.avgLabel"),
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section aria-labelledby="faq-heading" className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <FaqSection />
        </ScrollReveal>
      </section>

      <div className="section-divide" />

      {/* ─── Bottom CTA ─── */}
      <CtaBand
        titleKey="ctaBand.default.title"
        ctaKey="ctaBand.default.cta"
        descKey="ctaBand.default.desc"
        secondaryKey="ctaBand.default.secondary"
        secondaryHref={`/${locale}/sectors`}
      />
    </PageShell>
  );
}
