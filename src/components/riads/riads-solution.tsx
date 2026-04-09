import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RiadsSolution() {
  const t = useTranslations("riads.solution");

  const pillars = [1, 2, 3, 4].map((n) => ({
    num: t(`pillar${n}Num`),
    title: t(`pillar${n}Title`),
    body: t(`pillar${n}Body`),
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
      <div className="mt-16 grid gap-5 sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <ScrollReveal key={i} delay={200 + i * 80}>
            <div className="group rounded-2xl border border-border bg-surface p-8 lg:p-10 h-full transition-all duration-300 hover:border-foreground/15 hover:shadow-lg hover:-translate-y-0.5">
              <p className="font-mono text-[11px] tracking-widest text-accent/80">
                {pillar.num}
              </p>
              <h3 className="mt-4 font-serif italic text-2xl sm:text-[28px] tracking-tight text-foreground leading-snug">
                {pillar.title}
              </h3>
              <p className="mt-4 text-muted text-[15px] leading-relaxed">
                {pillar.body}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
