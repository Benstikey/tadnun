"use client";

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import {
  SECTORS,
  calculateSavings,
  type SectorId,
  type CalculatorInputs,
} from "@/data/calculator-data";
import { CalculatorSectorIcon } from "./sector-cards";
import { SectorCards } from "./sector-cards";
import { SolutionToggles } from "./solution-toggles";
import { PainPoints } from "./pain-points";
import { FluidSliders } from "./fluid-sliders";
import { ResultsPanel } from "./results-panel";

const ease = [0.16, 1, 0.3, 1] as const;

export function SavingsCalculator() {
  const t = useTranslations();
  const locale = useLocale();

  const [sectorId, setSectorId] = useState<SectorId | null>(null);
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([]);
  const [inputs, setInputs] = useState<CalculatorInputs>({
    employees: 3,
    manualTaskIds: [],
    avgRevenuePerClient: 200,
  });

  const handleSectorSelect = useCallback((id: SectorId) => {
    const sector = SECTORS[id];
    setSectorId(id);
    setSelectedSolutions(sector.solutions.map((s) => s.id));
    setInputs({
      employees: sector.typicalEmployees,
      manualTaskIds: sector.manualTasks.map((t) => t.id),
      avgRevenuePerClient: Math.round(
        sector.avgMonthlyRevenue / (sector.typicalEmployees * 20),
      ),
    });
  }, []);

  const toggleSolution = useCallback((solutionId: string) => {
    setSelectedSolutions((prev) =>
      prev.includes(solutionId)
        ? prev.filter((s) => s !== solutionId)
        : [...prev, solutionId],
    );
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setInputs((prev) => ({
      ...prev,
      manualTaskIds: prev.manualTaskIds.includes(taskId)
        ? prev.manualTaskIds.filter((id) => id !== taskId)
        : [...prev.manualTaskIds, taskId],
    }));
  }, []);

  const results = useMemo(() => {
    if (!sectorId) return null;
    return calculateSavings(sectorId, selectedSolutions, inputs);
  }, [sectorId, selectedSolutions, inputs]);

  const hasResults = results && results.monthlySavingsMAD > 0;

  return (
    <div className="relative">
      {/* ── Hero area ── */}
      <div className="relative mb-14 lg:mb-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5"
        >
          {t("calculator.eyebrow")}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6, ease }}
          className="font-serif italic text-4xl sm:text-5xl lg:text-[4.25rem] leading-[1.06] tracking-tight text-foreground max-w-xl"
        >
          {t("calculator.headline")}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.18, duration: 0.5 }}
          className="text-muted mt-4 max-w-md leading-relaxed"
        >
          {t("calculator.subheadline")}
        </motion.p>
      </div>

      {/* ── Sector cards ── */}
      <SectorCards selected={sectorId} onSelect={handleSectorSelect} t={t} />

      {/* ── Configuration + results ── */}
      <AnimatePresence>
        {sectorId && (
          <motion.div
            key={sectorId}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.65, ease }}
            className="mt-14 lg:mt-16"
          >
            {/* Section divider with sector name */}
            <div className="flex items-center gap-4 mb-10">
              <span className="text-accent">
                <CalculatorSectorIcon id={sectorId} size={20} />
              </span>
              <span className="text-sm font-medium text-foreground">
                {t(`calculator.sectors.${sectorId}`)}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* ── Left: interactive ── */}
              <div className="lg:col-span-7 space-y-10">
                {/* Pain points — replaces "hours lost" */}
                <PainPoints
                  sectorId={sectorId}
                  selectedTaskIds={inputs.manualTaskIds}
                  onToggle={toggleTask}
                  t={t}
                />

                <div className="h-px bg-border/60" />

                {/* Solutions */}
                <SolutionToggles
                  sectorId={sectorId}
                  selected={selectedSolutions}
                  onToggle={toggleSolution}
                  t={t}
                />

                <div className="h-px bg-border/60" />

                {/* Remaining sliders: employees + revenue */}
                <FluidSliders
                  sectorId={sectorId}
                  inputs={inputs}
                  onChange={setInputs}
                  t={t}
                />
              </div>

              {/* ── Right: sticky results ── */}
              <div className="lg:col-span-5 lg:sticky lg:top-24">
                <ResultsPanel
                  results={results}
                  locale={locale}
                  ctaHref={`/${locale}/contact`}
                  t={t}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile sticky bar ── */}
      <AnimatePresence>
        {hasResults && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-border bg-background/95 backdrop-blur-lg px-6 py-4"
          >
            <div className="flex items-center justify-between max-w-lg mx-auto">
              <div>
                <span className="text-[11px] text-muted block">
                  {t("calculator.youCanSave")}
                </span>
                <span className="text-lg font-bold text-accent font-tabular">
                  {results!.monthlySavingsMAD.toLocaleString("fr-MA")} MAD
                  <span className="text-xs text-muted font-normal ms-1">
                    /{t("calculator.perMonth")}
                  </span>
                </span>
              </div>
              <a
                href={`/${locale}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:bg-foreground/85 active:scale-[0.97] transition-all"
              >
                {t("calculator.cta")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
