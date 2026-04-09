import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RiadsMath() {
  const t = useTranslations("riads.math");
  const locale = useLocale();

  const stats = [
    { value: t("stat1Value"), label: t("stat1Label") },
    { value: t("stat2Value"), label: t("stat2Label") },
    { value: t("stat3Value"), label: t("stat3Label") },
  ];

  return (
    <section className="relative bg-foreground text-background overflow-hidden grain">
      <div
        className="absolute top-0 start-0 w-[600px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)", transform: "translate(-20%, -30%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-6 text-center">
            {t("eyebrow")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] max-w-3xl mx-auto text-center">
            {t("title")}{" "}
            <span className="text-red-400">{t("titleAccent")}</span>{" "}
            {t("titleEnd")}
          </h2>
        </ScrollReveal>
        <div className="mt-16 grid gap-5 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={200 + i * 100}>
              <div className="rounded-2xl border border-background/8 bg-background/[0.03] p-7 h-full">
                <p className="font-serif italic text-5xl sm:text-6xl text-red-400/90 leading-none tracking-tight tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-5 text-background/55 text-[14px] leading-relaxed">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <ScrollReveal delay={600}>
          <blockquote className="mt-16 max-w-2xl mx-auto text-center">
            <p className="font-serif italic text-xl sm:text-2xl text-background/75 leading-snug">
              &ldquo;{t("quote")}&rdquo;
            </p>
            <cite className="mt-5 block text-[12px] font-mono tracking-wider text-background/35 uppercase not-italic">
              — {t("quoteAuthor")}
            </cite>
          </blockquote>
        </ScrollReveal>
        <ScrollReveal delay={700}>
          <div className="mt-10 flex justify-center">
            <a
              href={`/${locale}/contact?sector=tourism`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent text-white px-8 py-3.5 text-[14px] font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 active:scale-[0.97] transition-all duration-200 hover:-translate-y-0.5"
            >
              {t("cta")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
