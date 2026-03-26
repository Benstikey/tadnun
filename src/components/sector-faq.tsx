"use client";

import { useState } from "react";

type FaqItem = { q: string; qEn: string; a: string; aEn: string };

export function SectorFaq({ items, isFr }: { items: FaqItem[]; isFr: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `sector-faq-panel-${i}`;
        const buttonId = `sector-faq-button-${i}`;
        return (
          <div key={i}>
            <h3>
              <button
                id={buttonId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                <span className="text-[15px] font-medium text-foreground pe-8">
                  {isFr ? item.q : item.qEn}
                </span>
                <span
                  className={`shrink-0 text-muted text-lg transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
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
              className={`overflow-hidden transition-all duration-200 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}
              hidden={!isOpen}
            >
              <p className="text-muted text-[14px] leading-relaxed max-w-2xl">
                {isFr ? item.a : item.aEn}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
