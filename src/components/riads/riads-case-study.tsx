import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RiadsCaseStudy() {
  const t = useTranslations("riads.case");

  const metrics = [1, 2, 3, 4].map((n) => ({
    label: t(`row${n}Label`),
    before: t(`row${n}Before`),
    after: t(`row${n}After`),
  }));

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-5 text-center">
          {t("eyebrow")}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-3xl mx-auto text-center">
          {t("title")}{" "}
          <span className="text-accent">{t("titleAccent")}</span>
        </h2>
      </ScrollReveal>

      {/* 4 vertical metric cards — each shows before → after top-down, all centered */}
      <ScrollReveal delay={200}>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border bg-surface p-7 flex flex-col items-center text-center"
            >
              {/* Metric label */}
              <p className="text-[11px] font-mono tracking-widest text-muted uppercase leading-snug min-h-[32px] flex items-center justify-center">
                {metric.label}
              </p>

              {/* Before block */}
              <div className="mt-5 pb-5 border-b border-dashed border-border w-full flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                  <span className="text-[10px] font-mono tracking-widest text-red-500/70 uppercase">
                    {t("beforeLabel")}
                  </span>
                </div>
                <p className="font-serif italic text-3xl text-red-500/55 tabular-nums leading-none tracking-tight line-through decoration-red-500/30">
                  {metric.before}
                </p>
              </div>

              {/* Arrow down */}
              <div className="flex justify-center py-3 text-accent/40">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* After block */}
              <div className="w-full flex flex-col items-center">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  <span className="text-[10px] font-mono tracking-widest text-emerald-700 uppercase">
                    {t("afterLabel")}
                  </span>
                </div>
                <p className="font-serif italic text-4xl text-emerald-700 tabular-nums leading-none tracking-tight">
                  {metric.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Result strip */}
      <ScrollReveal delay={350}>
        <div className="mt-6 rounded-2xl bg-accent/[0.05] border border-accent/15 px-6 py-8 text-center">
          <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-foreground leading-[1.15] tracking-tight">
            {t("result")}{" "}
            <span className="text-accent">{t("resultAccent")}</span>
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={400}>
        <blockquote className="mt-10 max-w-2xl mx-auto text-center">
          <p className="font-serif italic text-lg sm:text-xl text-foreground/60 leading-snug">
            &ldquo;{t("quote")}&rdquo;
          </p>
        </blockquote>
      </ScrollReveal>
    </section>
  );
}
