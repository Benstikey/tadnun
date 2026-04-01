"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

type Provider = "odoo" | "agency" | "freelance";

const ROW_KEYS = ["target", "darija", "integrations", "training", "pricing", "support", "offline", "ownership"] as const;
const TABS: { key: Provider; labelKey: string }[] = [
  { key: "odoo", labelKey: "vsOdoo" },
  { key: "agency", labelKey: "vsAgency" },
  { key: "freelance", labelKey: "vsFreelance" },
];

export function ComparisonTable() {
  const t = useTranslations("offre.compare");
  const [active, setActive] = useState<Provider>("odoo");

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t.rich("title", {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        />
      </ScrollReveal>

      {/* Desktop table */}
      <ScrollReveal delay={150}>
        <div className="hidden lg:block mt-14 rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="bg-surface/50">
                <th className="text-start p-4 font-medium text-muted w-[180px]" />
                <th className="text-start p-4 font-semibold text-accent">Tadnun</th>
                <th className="text-start p-4 font-medium text-muted">{t("colOdoo")}</th>
                <th className="text-start p-4 font-medium text-muted">{t("colAgency")}</th>
                <th className="text-start p-4 font-medium text-muted">{t("colFreelance")}</th>
              </tr>
            </thead>
            <tbody>
              {ROW_KEYS.map((key) => (
                <tr key={key} className="border-t border-border">
                  <td className="p-4 font-medium text-foreground">{t(`rows.${key}.label`)}</td>
                  <td className="p-4 text-accent font-medium">{t(`rows.${key}.tadnun`)}</td>
                  <td className="p-4 text-muted">{t(`rows.${key}.odoo`)}</td>
                  <td className="p-4 text-muted">{t(`rows.${key}.agency`)}</td>
                  <td className="p-4 text-muted">{t(`rows.${key}.freelance`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollReveal>

      {/* Mobile tabbed */}
      <div className="lg:hidden mt-10">
        <div className="flex gap-2 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                active === tab.key
                  ? "bg-foreground text-background"
                  : "bg-surface border border-border text-muted hover:text-foreground"
              }`}
            >
              {t(tab.labelKey)}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {ROW_KEYS.map((key) => (
            <div key={key} className="rounded-xl border border-border p-4">
              <p className="text-[12px] font-mono text-muted/60 uppercase tracking-wider mb-2">{t(`rows.${key}.label`)}</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[11px] text-accent font-medium mb-0.5">Tadnun</p>
                  <p className="text-[13px] text-foreground font-medium">{t(`rows.${key}.tadnun`)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted font-medium mb-0.5">
                    {t(TABS.find((tab) => tab.key === active)!.labelKey)}
                  </p>
                  <p className="text-[13px] text-muted">{t(`rows.${key}.${active}`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
