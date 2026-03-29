"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CalculatorResults } from "@/data/calculator-data";

interface ResultsPanelProps {
  results: CalculatorResults | null;
  locale: string;
  ctaHref: string;
  t: (key: string) => string;
}

const ease = [0.16, 1, 0.3, 1] as const;

function useCountUp(target: number, duration = 600) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);
  const raf = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    const t0 = performance.now();

    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(start + diff * eased));
      if (p < 1) raf.current = requestAnimationFrame(tick);
      else prev.current = target;
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return value;
}

function Metric({
  value,
  label,
  prefix,
  suffix,
}: {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}) {
  const animated = useCountUp(value);

  return (
    <div className="flex items-baseline justify-between py-3 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-semibold text-foreground font-tabular">
        {prefix}
        {animated.toLocaleString("fr-MA")}
        {suffix}
      </span>
    </div>
  );
}

export function ResultsPanel({ results, locale, ctaHref, t }: ResultsPanelProps) {
  const hasResults = results && results.monthlySavingsMAD > 0;
  const totalAnimated = useCountUp(results?.monthlySavingsMAD ?? 0, 800);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5, ease }}
      className="rounded-2xl border border-border bg-surface p-6 lg:p-8"
    >
      {/* Main number */}
      <div className="text-center mb-6">
        <p className="text-xs text-muted uppercase tracking-wider mb-2">
          {t("calculator.resultsLabel")}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={hasResults ? "value" : "empty"}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {hasResults ? (
              <>
                <span className="text-3xl lg:text-4xl font-bold text-accent font-tabular">
                  {totalAnimated.toLocaleString("fr-MA")}
                </span>
                <span className="text-sm text-muted ms-1.5">
                  MAD / {t("calculator.perMonth")}
                </span>
              </>
            ) : (
              <span className="text-sm text-muted">
                {t("calculator.noResults")}
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Breakdown */}
      <AnimatePresence>
        {hasResults && results && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="border-t border-border pt-4 mb-6">
              <Metric
                value={results.hoursSavedMonthly}
                label={t("calculator.results.hoursSaved")}
                prefix="-"
                suffix="h"
              />
              <Metric
                value={results.revenueRecoveredMAD}
                label={t("calculator.results.revenueRecovered")}
                prefix="+"
                suffix=" MAD"
              />
              <Metric
                value={results.clientsRecovered}
                label={t("calculator.results.clientsRecovered")}
                prefix="+"
              />
            </div>

            {/* CTA */}
            <a
              href={ctaHref}
              className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/85 active:scale-[0.97] transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-foreground/10"
            >
              <span>{t("calculator.cta")}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="opacity-60 rtl:-scale-x-100"
              >
                <path
                  d="M2 7h10m0 0L8.5 3.5M12 7l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="text-xs text-muted text-center mt-3">
              {t("calculator.ctaSubtext")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
