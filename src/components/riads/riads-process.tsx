import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { RiadsCtaButton } from "./riads-cta-button";

export function RiadsProcess() {
  const t = useTranslations("riads.process");

  const steps = [1, 2, 3].map((n) => ({
    num: t(`step${n}Num`),
    title: t(`step${n}Title`),
    body: t(`step${n}Body`),
  }));

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-5">
          {t("eyebrow")}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-3xl">
          {t("title")}{" "}
          <span className="text-accent">{t("titleAccent")}</span>
        </h2>
      </ScrollReveal>
      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        {steps.map((step, i) => (
          <ScrollReveal key={i} delay={200 + i * 100}>
            <div className="relative rounded-2xl border border-border bg-surface/40 p-8 h-full">
              <p className="font-mono text-[11px] tracking-widest text-accent/80 mb-4">
                {step.num}
              </p>
              <h3 className="font-serif italic text-xl sm:text-2xl tracking-tight text-foreground leading-snug">
                {step.title}
              </h3>
              <p className="mt-4 text-muted text-[14px] leading-relaxed">
                {step.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
      <ScrollReveal delay={500}>
        <div className="mt-12 flex justify-center">
          <RiadsCtaButton label={t("cta")} />
        </div>
      </ScrollReveal>
    </section>
  );
}
