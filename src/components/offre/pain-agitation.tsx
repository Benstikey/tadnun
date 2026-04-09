import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AnimatedStat } from "@/components/visuals/animated-stat";

export function PainAgitation() {
  const t = useTranslations("offre.pain");
  const items = ["0", "1", "2", "3"] as const;

  return (
    <section className="bg-foreground text-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-3">
            {t("eyebrow")}
          </p>
          <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1] max-w-3xl">
            {t.rich("title", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {items.map((i, idx) => (
            <ScrollReveal key={i} delay={idx * 100}>
              <div className="rounded-2xl border border-background/10 bg-background/[0.04] p-6 sm:p-8">
                <div className="flex items-baseline gap-1.5">
                  <AnimatedStat
                    value={t(`items.${i}.stat`)}
                    className="text-3xl sm:text-4xl font-serif italic text-accent"
                  />
                  <span className="text-sm text-background/40">{t(`items.${i}.unit`)}</span>
                </div>
                <p className="mt-3 text-background/80 font-medium text-[15px]">{t(`items.${i}.desc`)}</p>
                <p className="mt-1.5 text-background/35 text-[13px]">{t(`items.${i}.detail`)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={500}>
          <p className="mt-12 text-center text-background/50 text-base max-w-xl mx-auto leading-relaxed">
            {t("stat")}
            <br />
            <span className="text-background/70 font-medium">{t("punchline")}</span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
