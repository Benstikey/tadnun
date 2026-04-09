import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { getCaseStudySlugs } from "@/data/case-studies";

const COLORS = [
  "bg-accent/8 text-accent",
  "bg-success/8 text-success",
  "bg-accent/8 text-accent",
  "bg-foreground/6 text-foreground/70",
  "bg-accent/8 text-accent",
  "bg-foreground/6 text-foreground/70",
];

const CASE_SLUGS = getCaseStudySlugs();

export function CaseStudies() {
  const t = useTranslations("offre.cases");
  const locale = useLocale();
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
              <a
                href={`/${locale}/case-studies/${CASE_SLUGS[idx]}`}
                className="group rounded-2xl border border-border bg-surface/50 p-6 sm:p-7 h-full flex flex-col hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-[11px] font-mono tracking-wide px-2.5 py-1 rounded-full ${COLORS[idx]}`}>
                    {t(`items.${i}.sector`)}
                  </span>
                  <span className="text-muted/50 text-[12px]">{t(`items.${i}.city`)}</span>
                </div>
                <p className="text-muted text-[13px] leading-relaxed">{t(`items.${i}.problem`)}</p>
                <p className="mt-4 font-serif italic text-xl tracking-tight text-foreground group-hover:text-accent transition-colors">
                  {t(`items.${i}.result`)}
                </p>
                <p className="mt-1 text-accent text-[13px] font-medium">{t(`items.${i}.detail`)}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
