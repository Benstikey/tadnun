import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

const WA_PREFILL = encodeURIComponent(
  "Bonjour, je suis propriétaire d'un riad au Maroc et j'aimerais discuter de votre solution."
);

export function RiadsFinalCta() {
  const t = useTranslations("riads.finalCta");
  const locale = useLocale();

  return (
    <section className="relative bg-foreground text-background overflow-hidden grain">
      <div
        className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(196,72,42,0.15) 0%, transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-6">
            {t("eyebrow")}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <h2 className="font-serif italic text-4xl sm:text-5xl lg:text-[4rem] tracking-tight leading-[1.05]">
            {t("title")}{" "}
            <span className="text-accent">{t("titleAccent")}</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className="mt-6 text-background/55 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
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
              href={`https://wa.me/212632431557?text=${WA_PREFILL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-background/80 border border-background/20 rounded-full px-6 py-3 hover:border-background/40 hover:text-background transition-all"
            >
              {t("ctaWhatsapp")}
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
