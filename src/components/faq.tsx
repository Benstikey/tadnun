"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FaqSection() {
  const t = useTranslations("faq.items");
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="divide-y divide-border">
      {faqKeys.map((key) => {
        const isOpen = open === key;
        const panelId = `faq-panel-${key}`;
        const buttonId = `faq-button-${key}`;
        return (
          <div key={key}>
            <h3>
              <button
                id={buttonId}
                onClick={() => setOpen(isOpen ? null : key)}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="text-[15px] font-medium text-foreground pe-8">
                  {t(`${key}.question`)}
                </span>
                <span
                  className={`shrink-0 text-muted text-lg transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`overflow-hidden transition-all duration-200 ${
                isOpen ? "max-h-96 pb-5" : "max-h-0"
              }`}
              hidden={!isOpen}
            >
              <p className="text-muted text-[14px] leading-relaxed max-w-2xl">
                {t(`${key}.answer`)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
