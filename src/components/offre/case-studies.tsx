import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

const COLORS = [
  "bg-orange-500/10 text-orange-700",
  "bg-emerald-500/10 text-emerald-700",
  "bg-blue-500/10 text-blue-700",
  "bg-purple-500/10 text-purple-700",
  "bg-amber-500/10 text-amber-700",
  "bg-rose-500/10 text-rose-700",
];

export function CaseStudies() {
  const t = useTranslations("offre.cases");
  const items = ["0", "1", "2", "3", "4", "5"] as const;

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t.rich("title", {
              accent: (chunks) => <span className="text-accent">{chunks}</span>,
            })}
          />
        </ScrollReveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <ScrollReveal key={i} delay={idx * 80}>
              <div className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-7 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[11px] font-mono tracking-wide px-2.5 py-1 rounded-full ${COLORS[idx]}`}>
                    {t(`items.${i}.sector`)}
                  </span>
                  <span className="text-muted/50 text-[12px]">{t(`items.${i}.city`)}</span>
                </div>
                <p className="text-muted text-[13px] leading-relaxed">{t(`items.${i}.problem`)}</p>
                <p className="mt-4 font-serif italic text-xl tracking-tight text-foreground">
                  {t(`items.${i}.result`)}
                </p>
                <p className="mt-1 text-accent text-[13px] font-medium">{t(`items.${i}.detail`)}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
