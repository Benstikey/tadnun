import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

export function ProcessSteps() {
  const t = useTranslations("offre.process");
  const steps = ["0", "1", "2"] as const;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        />
      </ScrollReveal>

      <div className="mt-14 relative">
        <div className="hidden sm:block absolute top-[28px] inset-x-0 h-px bg-border z-0" />
        <div className="grid sm:grid-cols-3 gap-10 sm:gap-6">
          {steps.map((s, idx) => (
            <ScrollReveal key={s} delay={idx * 150}>
              <div className="relative flex items-start gap-4 sm:flex-col sm:items-center sm:text-center sm:px-4">
                <div className="relative z-10 shrink-0">
                  <div className="w-14 h-14 rounded-full bg-background border-2 border-accent/30 flex items-center justify-center">
                    <span className="font-serif italic text-lg text-accent">{t(`items.${s}.num`)}</span>
                  </div>
                </div>
                <div className="sm:mt-6">
                  <h3 className="text-foreground font-semibold text-lg">{t(`items.${s}.title`)}</h3>
                  <p className="mt-2 text-muted text-[14px] leading-relaxed sm:max-w-[280px]">
                    {t(`items.${s}.body`)}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
