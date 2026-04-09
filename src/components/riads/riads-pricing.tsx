import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RiadsPricing() {
  const t = useTranslations("riads.pricing");
  const locale = useLocale();

  const features = [1, 2, 3, 4, 5].map((n) => t(`feature${n}`));

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <div className="text-center">
          <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-5">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-3xl mx-auto">
            {t("title")}{" "}
            <span className="text-accent">{t("titleAccent")}</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={150}>
        <div className="mt-14 max-w-2xl mx-auto">
          <div className="relative rounded-3xl border border-border bg-surface p-8 sm:p-12 shadow-lg">
            {/* Price */}
            <div className="text-center pb-8 border-b border-border">
              <p className="text-[12px] font-mono tracking-widest text-muted uppercase">
                {t("priceLabel")}
              </p>
              <p className="mt-2 font-serif italic text-5xl sm:text-6xl text-accent leading-none tracking-tight">
                {t("priceValue")}
              </p>
              <p className="mt-4 text-muted text-[14px] leading-relaxed max-w-sm mx-auto">
                {t("priceNote")}
              </p>
            </div>

            {/* Features */}
            <ul className="mt-8 flex flex-col gap-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="shrink-0 mt-0.5"
                  >
                    <circle cx="10" cy="10" r="10" fill="var(--accent)" fillOpacity="0.15" />
                    <path
                      d="M6 10.5l2.5 2.5L14 8"
                      stroke="var(--accent)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[15px] text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* ROI callout */}
            <div className="mt-8 p-5 rounded-xl bg-accent/[0.05] border border-accent/15">
              <p className="text-[14px] text-foreground/80 italic leading-relaxed text-center">
                {t("roi")}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              <a
                href={`/${locale}/contact?sector=tourism`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-white px-10 py-4 text-[15px] font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 active:scale-[0.97] transition-all duration-200 hover:-translate-y-0.5"
              >
                {t("cta")}
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
