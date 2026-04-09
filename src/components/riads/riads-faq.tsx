import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";

export function RiadsFaq() {
  const t = useTranslations("riads.faq");

  const items = [1, 2, 3, 4, 5].map((n) => ({
    question: t(`q${n}`),
    answer: t(`a${n}`),
  }));

  return (
    <section className="mx-auto max-w-4xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <p className="text-accent text-[11px] font-mono tracking-[0.25em] uppercase mb-5 text-center">
          {t("eyebrow")}
        </p>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground leading-[1.1] text-center">
          {t("title")}
        </h2>
      </ScrollReveal>
      <div className="mt-12 flex flex-col gap-3">
        {items.map((item, i) => (
          <ScrollReveal key={i} delay={150 + i * 60}>
            <details className="group rounded-xl border border-border bg-surface/40 p-6 transition-all duration-300 hover:border-foreground/15 open:bg-surface">
              <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                <p className="font-semibold text-foreground text-[16px] leading-snug">
                  {item.question}
                </p>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                >
                  <path d="M10 5v10M5 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </summary>
              <p className="mt-4 text-muted text-[14px] leading-relaxed">
                {item.answer}
              </p>
            </details>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
