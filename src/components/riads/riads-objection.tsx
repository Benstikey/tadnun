import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RiadsObjection() {
  const t = useTranslations("riads.objection");

  const points = [1, 2, 3].map((n) => ({
    title: t(`point${n}Title`),
    body: t(`point${n}Body`),
  }));

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <div className="text-center">
          <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-5">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-3xl mx-auto">
            {t("title")}
          </h2>
        </div>
      </ScrollReveal>
      <div className="mt-16 grid gap-8 sm:grid-cols-3 max-w-5xl mx-auto">
        {points.map((point, i) => (
          <ScrollReveal key={i} delay={150 + i * 100}>
            <div className="relative">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 border border-accent/15 mb-5">
                <span className="font-serif italic text-xl text-accent">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-[17px] leading-snug">
                {point.title}
              </h3>
              <p className="mt-3 text-muted text-[14px] leading-relaxed">
                {point.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
