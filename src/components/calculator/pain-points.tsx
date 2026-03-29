"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SECTORS, type SectorId } from "@/data/calculator-data";

interface PainPointsProps {
  sectorId: SectorId;
  selectedTaskIds: string[];
  onToggle: (taskId: string) => void;
  t: (key: string) => string;
}

const ease = [0.16, 1, 0.3, 1] as const;

export function PainPoints({
  sectorId,
  selectedTaskIds,
  onToggle,
  t,
}: PainPointsProps) {
  const sector = SECTORS[sectorId];
  const totalHours = sector.manualTasks
    .filter((task) => selectedTaskIds.includes(task.id))
    .reduce((sum, task) => sum + task.hoursPerWeek, 0);

  return (
    <div>
      <p className="text-[13px] text-muted mb-4">
        {t("calculator.painPointsTitle")}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {sector.manualTasks.map((task, i) => {
          const isOn = selectedTaskIds.includes(task.id);

          return (
            <motion.button
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease }}
              onClick={() => onToggle(task.id)}
              className={`group relative flex items-start gap-3 rounded-xl p-3.5 text-start cursor-pointer transition-all duration-300 ${
                isOn
                  ? "bg-accent/[0.06]"
                  : "bg-transparent hover:bg-foreground/[0.02]"
              }`}
            >
              {/* Checkbox */}
              <div
                className={`mt-0.5 flex-shrink-0 w-[18px] h-[18px] rounded border-[1.5px] transition-all duration-300 flex items-center justify-center ${
                  isOn
                    ? "bg-accent border-accent"
                    : "border-border group-hover:border-foreground/25"
                }`}
              >
                <AnimatePresence>
                  {isOn && (
                    <motion.svg
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      width="10"
                      height="10"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>

              <div className="min-w-0">
                <span
                  className={`text-sm block leading-snug transition-colors duration-200 ${
                    isOn ? "text-foreground" : "text-muted group-hover:text-foreground/70"
                  }`}
                >
                  {t(`calculator.manualTasks.${sectorId}.${task.id}`)}
                </span>
                <span
                  className={`text-[11px] mt-0.5 block transition-colors duration-200 ${
                    isOn ? "text-accent" : "text-muted/50"
                  }`}
                >
                  ~{task.hoursPerWeek}h / {t("calculator.perWeek")}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Running total */}
      <motion.div
        animate={{ opacity: totalHours > 0 ? 1 : 0.4 }}
        className="mt-4 pt-3 border-t border-border/50 flex items-baseline justify-between"
      >
        <span className="text-xs text-muted">
          {t("calculator.painPointsTotal")}
        </span>
        <span className="text-sm font-semibold text-foreground font-tabular">
          {totalHours}h <span className="text-muted font-normal">/ {t("calculator.perWeek")}</span>
        </span>
      </motion.div>
    </div>
  );
}
