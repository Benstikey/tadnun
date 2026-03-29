"use client";

import { motion } from "framer-motion";
import { SECTORS, type SectorId } from "@/data/calculator-data";

interface SolutionTogglesProps {
  sectorId: SectorId;
  selected: string[];
  onToggle: (solutionId: string) => void;
  t: (key: string) => string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function SolutionToggles({
  sectorId,
  selected,
  onToggle,
  t,
}: SolutionTogglesProps) {
  const sector = SECTORS[sectorId];

  return (
    <div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.05 }}
        className="text-sm text-muted mb-4"
      >
        {t("calculator.solutionsTitle")}
      </motion.p>

      <div className="flex flex-col gap-2.5">
        {sector.solutions.map((sol, i) => {
          const isOn = selected.includes(sol.id);
          const pct = Math.round(sol.timeSavingsPct * 100);

          return (
            <motion.button
              key={sol.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease }}
              onClick={() => onToggle(sol.id)}
              className={`group flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all duration-300 ${
                isOn
                  ? "border-accent/30 bg-accent-light/40"
                  : "border-border bg-surface hover:border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Toggle switch */}
                <div
                  className={`relative w-9 h-5 rounded-full transition-colors duration-300 ${
                    isOn ? "bg-accent" : "bg-border"
                  }`}
                >
                  <motion.div
                    animate={{ x: isOn ? 16 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-surface shadow-sm"
                  />
                </div>
                <span
                  className={`text-sm transition-colors duration-200 ${
                    isOn ? "text-foreground font-medium" : "text-muted"
                  }`}
                >
                  {t(`calculator.solutions.${sectorId}.${sol.id}`)}
                </span>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full transition-all duration-300 ${
                  isOn
                    ? "bg-accent/10 text-accent font-medium"
                    : "bg-transparent text-muted/60"
                }`}
              >
                -{pct}% {t("calculator.adminTime")}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
