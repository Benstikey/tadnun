import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RiadsHero() {
  const t = useTranslations("riads.hero");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden">
      {/* Warm accent glow */}
      <div
        className="absolute top-0 start-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(196,72,42,0.08) 0%, transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-24 text-center">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-6">
            {t("eyebrow")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-[4.5rem] leading-[1.05] tracking-tight text-foreground max-w-3xl mx-auto">
            {t("title1")}
            <br />
            <span className="text-accent">{t("title2")}</span>{" "}
            {t("title3")}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="mt-8 text-muted text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`/${locale}/contact?sector=tourism`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white px-10 py-4 text-[15px] font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 active:scale-[0.97] transition-all duration-200 hover:-translate-y-0.5"
            >
              {t("cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={`/${locale}/calculator`}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-border rounded-full px-6 py-3 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all"
            >
              {t("ctaSecondary")}
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={400}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-muted font-mono tracking-wider">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {t("trust1")}
            </span>
            <span className="text-border">·</span>
            <span>{t("trust2")}</span>
            <span className="text-border">·</span>
            <span>{t("trust3")}</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
