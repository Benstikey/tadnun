"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { trackEvent } from "@/lib/analytics";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8"] as const;

const categoryMap: Record<string, string> = {
  q1: "getting-started",
  q2: "getting-started",
  q3: "service",
  q4: "service",
  q5: "service",
  q6: "pricing",
  q7: "pricing",
  q8: "getting-started",
};

export function FaqSection() {
  const t = useTranslations("faq");
  const locale = useLocale();
  const [open, setOpen] = useState<string | null>("q1");

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
      {/* Left: sticky heading + CTA */}
      <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
        <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-4">
          {t("eyebrow")}
        </p>
        <h2
          id="faq-heading"
          className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground leading-[1.12]"
        >
          {t("title")}
        </h2>
        <p className="mt-4 text-muted text-[15px] leading-relaxed">
          {t("subtitle")}
        </p>
        <div className="mt-8 flex items-center gap-3">
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90 active:scale-[0.97] transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-foreground/10"
          >
            {t("ctaButton")}
          </a>
        </div>
      </div>

      {/* Right: accordion */}
      <div className="lg:col-span-8">
        <div className="divide-y divide-border/70">
          {faqKeys.map((key) => {
            const isOpen = open === key;
            const panelId = `faq-panel-${key}`;
            const buttonId = `faq-button-${key}`;
            const category = categoryMap[key];
            return (
              <div key={key} className="group">
                <h3>
                  <button
                    id={buttonId}
                    onClick={() => {
                      const next = isOpen ? null : key;
                      setOpen(next);
                      if (next) trackEvent("faq_opened", { question_key: key, category });
                    }}
                    className="w-full flex items-start gap-4 py-6 text-left cursor-pointer"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    {/* Category tag */}
                    <span className="mt-0.5 shrink-0 text-[10px] font-mono tracking-wider uppercase text-muted bg-foreground/[0.04] rounded-full px-2.5 py-1 hidden sm:inline-block">
                      {t(`categories.${category}`)}
                    </span>

                    {/* Question text */}
                    <span
                      className={`flex-1 text-[15px] sm:text-base font-medium leading-snug transition-colors ${
                        isOpen ? "text-foreground" : "text-foreground/75 group-hover:text-foreground"
                      }`}
                    >
                      {t(`items.${key}.question`)}
                    </span>

                    {/* Toggle icon */}
                    <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full border border-border flex items-center justify-center transition-all group-hover:border-foreground/30">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6">
                      <p
                        className="text-muted text-[14px] leading-relaxed transition-opacity duration-300"
                        style={{ opacity: isOpen ? 1 : 0 }}
                      >
                        {t(`items.${key}.answer`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
