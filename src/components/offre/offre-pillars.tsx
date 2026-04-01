import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

export function OffrePillars() {
  const t = useTranslations("offre.pillars");
  const pillars = ["0", "1", "2"] as const;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
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
        {pillars.map((p, idx) => (
          <ScrollReveal key={p} delay={idx * 120}>
            <div className="rounded-2xl border border-border bg-surface/50 p-8 h-full">
              <span className="text-accent/40 font-mono text-sm">{t(`items.${p}.num`)}</span>
              <h3 className="mt-2 font-serif italic text-xl tracking-tight">{t(`items.${p}.title`)}</h3>
              <ul className="mt-5 space-y-3">
                {[0, 1, 2, 3].map((j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[14px] text-muted leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                    {t(`items.${p}.list.${j}`)}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={400}>
        <p className="mt-10 text-center text-muted text-[13px]">{t("footnote")}</p>
      </ScrollReveal>
    </section>
  );
}
