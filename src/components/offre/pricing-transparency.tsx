import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

export function PricingTransparency() {
  const t = useTranslations("offre.pricing");
  const items = ["0", "1", "2"] as const;

  return (
    <section className="bg-surface/50 border-y border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t.rich("title", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
            subtitle={t("subtitle")}
          />
        </ScrollReveal>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {items.map((i, idx) => (
            <ScrollReveal key={i} delay={idx * 100}>
              <div className="flex items-start gap-4">
                <div className="mt-1 w-8 h-8 rounded-full border-2 border-accent/30 flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3.5 8.5L6.5 11.5L12.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-[15px]">{t(`items.${i}.title`)}</h3>
                  <p className="mt-1.5 text-muted text-[14px] leading-relaxed">{t(`items.${i}.body`)}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
