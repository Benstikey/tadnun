"use client";

import { useTranslations, useLocale } from "next-intl";
import { trackEvent } from "@/lib/analytics";
import { CtaVisual } from "./cta-visual";

export function CtaBand({
  titleKey = "ctaBand.default.title",
  ctaKey = "ctaBand.default.cta",
  descKey,
  secondaryKey,
  secondaryHref,
  sectorKey,
  withVisual = true,
}: {
  titleKey?: string;
  ctaKey?: string;
  descKey?: string;
  secondaryKey?: string;
  secondaryHref?: string;
  sectorKey?: string | null;
  withVisual?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();

  const contactHref = sectorKey
    ? `/${locale}/contact?sector=${sectorKey}`
    : `/${locale}/contact`;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="rounded-2xl border border-border bg-surface/50 px-10 py-12 lg:px-14 lg:py-14">
        <div className={withVisual ? "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10" : ""}>
          <div className="max-w-xl">
            <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground leading-[1.1]">
              {t(titleKey)}
            </h2>
            {descKey && (
              <p className="mt-5 text-muted text-base leading-relaxed">
                {t(descKey)}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={contactHref}
                onClick={() => trackEvent("cta_clicked", { location: "cta_band", label: t(ctaKey), sector: sectorKey || "none" })}
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/25 hover:bg-accent/90 active:scale-[0.97] active:shadow-sm transition-all duration-150 hover:-translate-y-px"
              >
                {t(ctaKey)}
              </a>
              {secondaryKey && secondaryHref && (
                <a
                  href={secondaryHref}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-foreground border border-border rounded-full px-5 py-2.5 hover:border-foreground/30 hover:bg-foreground/[0.04] transition-all"
                >
                  {t(secondaryKey)}
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform group-hover:translate-x-0.5">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {withVisual && (
            <div className="hidden lg:flex items-center justify-center shrink-0">
              <CtaVisual />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
