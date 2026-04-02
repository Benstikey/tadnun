"use client";

import { useRef } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";

const ROW_KEYS = ["target", "darija", "integrations", "training", "pricing", "support", "offline", "ownership"] as const;
const COMPETITORS = ["odoo", "agency", "freelance"] as const;

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
      <circle cx="10" cy="10" r="10" fill="var(--accent, #C4482A)" fillOpacity="0.25" />
      <path d="M6 10.5l2.5 2.5L14 8" stroke="var(--accent, #C4482A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ComparisonTable() {
  const t = useTranslations("offre.compare");
  const locale = useLocale();
  const scrollRef = useRef<HTMLDivElement>(null);

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

      {/* ── Desktop ── */}
      <ScrollReveal delay={150}>
        <div className="hidden lg:block mt-14 relative">
          {/* Tadnun gradient background */}
          <div
            className="absolute top-0 end-0 bottom-0 w-[270px] rounded-2xl"
            style={{
              background: "linear-gradient(160deg, #C4482A 0%, #a83520 50%, #8B2A15 100%)",
              boxShadow: "0 12px 48px rgba(196, 72, 42, 0.25), 0 4px 16px rgba(196, 72, 42, 0.15)",
            }}
          />

          <div className="relative">
            {/* Header */}
            <div className="flex items-end">
              <div className="flex-1 min-w-0 flex items-end pb-4 pe-6 border-b border-border">
                <div className="w-[160px] shrink-0" />
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <p className="text-[13px] font-semibold text-foreground">{t("colOdoo")}</p>
                  <p className="text-[13px] font-semibold text-foreground">{t("colAgency")}</p>
                  <p className="text-[13px] font-semibold text-foreground">{t("colFreelance")}</p>
                </div>
              </div>
              <div className="w-[270px] shrink-0 px-6 pb-4 pt-5">
                <p className="font-serif italic text-2xl tracking-tight text-white">Tadnun</p>
              </div>
            </div>

            {/* Data rows */}
            {ROW_KEYS.map((key, i) => (
              <div key={key} className="flex items-stretch">
                <div className={`flex-1 min-w-0 flex items-center py-4 px-3 ${i % 2 === 0 ? "bg-surface/40 rounded-s-xl" : ""}`}>
                  <div className="w-[148px] shrink-0">
                    <p className="text-[14px] font-medium text-foreground">{t(`rows.${key}.label`)}</p>
                  </div>
                  <div className="flex-1 grid grid-cols-3 gap-4 pe-6">
                    <p className="text-[13px] text-muted leading-snug">{t(`rows.${key}.odoo`)}</p>
                    <p className="text-[13px] text-muted leading-snug">{t(`rows.${key}.agency`)}</p>
                    <p className="text-[13px] text-muted leading-snug">{t(`rows.${key}.freelance`)}</p>
                  </div>
                </div>
                <div className={`w-[270px] shrink-0 flex items-center gap-3 px-6 py-4 ${
                  i > 0 ? "border-t border-white/10" : ""
                }`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
                    <circle cx="10" cy="10" r="10" fill="white" fillOpacity="0.2" />
                    <path d="M6 10.5l2.5 2.5L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[13px] font-semibold text-white leading-tight">
                    {t(`rows.${key}.tadnun`)}
                  </span>
                </div>
              </div>
            ))}

            {/* Typical cost row */}
            <div className="flex items-stretch mt-2">
              <div className="flex-1 min-w-0 flex items-center py-5 px-3 bg-surface/60 rounded-s-xl border-t-2 border-border">
                <div className="w-[148px] shrink-0">
                  <p className="text-[14px] font-semibold text-foreground">
                    {locale === "fr" ? "Coût typique" : locale === "ar" ? "التكلفة المعتادة" : "Typical cost"}
                  </p>
                </div>
                <div className="flex-1 grid grid-cols-3 gap-4 pe-6">
                  <p className="text-[15px] font-bold text-red-500 leading-snug">50–150K <span className="text-[11px] font-normal">MAD/an</span></p>
                  <p className="text-[15px] font-bold text-red-500 leading-snug">15–80K <span className="text-[11px] font-normal">MAD</span></p>
                  <p className="text-[15px] font-bold text-red-500 leading-snug">5–30K <span className="text-[11px] font-normal">MAD</span></p>
                </div>
              </div>
              <div className="w-[270px] shrink-0 flex items-center gap-3 px-6 py-5 border-t border-white/10">
                <p className="text-[18px] font-bold text-emerald-400">
                  à partir de 5K <span className="text-[12px] font-normal text-white/50">MAD</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── Mobile / Tablet: horizontal scroll cards, Tadnun first ── */}
      <div className="lg:hidden mt-10">
        {/* Scroll hint */}
        <div className="flex items-center gap-2 mb-4 text-[11px] text-muted">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t("colOdoo")}, {t("colAgency")}, {t("colFreelance")}
        </div>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6"
          style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
        >
          {/* Tadnun card — first */}
          <div
            className="w-[280px] shrink-0 snap-start rounded-2xl p-5 flex flex-col"
            style={{
              background: "linear-gradient(160deg, #2a1810 0%, #1a0e08 35%, #0f0a07 60%, #1a130f 100%)",
              boxShadow: "0 8px 40px rgba(196, 72, 42, 0.12), 0 0 0 1px rgba(196, 72, 42, 0.08)",
            }}
          >
            <p className="font-serif italic text-xl tracking-tight text-white mb-4">Tadnun</p>
            {ROW_KEYS.map((key, i) => (
              <div key={key} className={`flex items-start gap-3 py-3 ${
                i < ROW_KEYS.length - 1 ? "border-b border-white/6" : ""
              }`}>
                <CheckIcon />
                <div>
                  <p className="text-[13px] font-medium text-white/90 leading-tight">
                    {t(`rows.${key}.tadnun`)}
                  </p>
                  <p className="text-[10px] text-white/25 mt-0.5">{t(`rows.${key}.label`)}</p>
                </div>
              </div>
            ))}
            {/* Cost */}
            <div className="border-t border-white/10 pt-4 mt-2">
              <p className="text-[10px] text-white/25 mb-1">{locale === "fr" ? "Coût typique" : locale === "ar" ? "التكلفة المعتادة" : "Typical cost"}</p>
              <p className="text-[18px] font-bold text-emerald-400">à partir de 5K <span className="text-[12px] font-normal text-white/50">MAD</span></p>
            </div>
          </div>

          {/* Competitor cards */}
          {COMPETITORS.map((comp) => (
            <div
              key={comp}
              className="w-[280px] shrink-0 snap-start rounded-2xl border border-border bg-surface p-5 flex flex-col"
            >
              <p className="text-[14px] font-semibold text-foreground mb-4">
                {t(`col${comp.charAt(0).toUpperCase() + comp.slice(1)}` as "colOdoo" | "colAgency" | "colFreelance")}
              </p>
              {ROW_KEYS.map((key, i) => (
                <div key={key} className={`py-3 ${
                  i < ROW_KEYS.length - 1 ? "border-b border-border/60" : ""
                }`}>
                  <p className="text-[13px] text-muted leading-tight">
                    {t(`rows.${key}.${comp}`)}
                  </p>
                  <p className="text-[10px] text-muted/40 mt-0.5">{t(`rows.${key}.label`)}</p>
                </div>
              ))}
              {/* Cost */}
              <div className="border-t-2 border-border pt-4 mt-2">
                <p className="text-[10px] text-muted/40 mb-1">{locale === "fr" ? "Coût typique" : locale === "ar" ? "التكلفة المعتادة" : "Typical cost"}</p>
                <p className="text-[15px] font-bold text-red-500">
                  {{ odoo: "50–150K", agency: "15–80K", freelance: "5–30K" }[comp]} <span className="text-[11px] font-normal text-muted">MAD</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll dots indicator */}
        <div className="flex justify-center gap-1.5 mt-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${
              i === 0 ? "w-5 bg-accent" : "w-1.5 bg-border"
            }`} />
          ))}
        </div>
      </div>
    </section>
  );
}
