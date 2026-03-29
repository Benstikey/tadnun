"use client";

import { motion } from "framer-motion";
import { SECTOR_IDS, SECTORS, type SectorId } from "@/data/calculator-data";
import {
  ShoppingBag,
  ForkSpoon,
  Scissors,
  Stethoscope,
  Briefcase,
  BuildingOne,
} from "@icon-park/react";
import type { ComponentType } from "react";

interface SectorCardsProps {
  selected: SectorId | null;
  onSelect: (id: SectorId) => void;
  t: (key: string) => string;
}

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

const SECTOR_ICONS: Record<SectorId, IconComponent> = {
  retail: ShoppingBag,
  restaurant: ForkSpoon,
  salon: Scissors,
  medical: Stethoscope,
  services: Briefcase,
  pme: BuildingOne,
};

export function CalculatorSectorIcon({ id, size = 24 }: { id: SectorId; size?: number }) {
  const Icon = SECTOR_ICONS[id];
  return <Icon size={size} strokeWidth={3} aria-hidden="true" />;
}

export function SectorCards({ selected, onSelect, t }: SectorCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {SECTOR_IDS.map((id, i) => {
        const sector = SECTORS[id];
        const isActive = selected === id;
        const isDimmed = selected !== null && !isActive;
        const Icon = SECTOR_ICONS[id];

        return (
          <motion.button
            key={id}
            initial={{ opacity: 0, y: 14 }}
            animate={{
              opacity: isDimmed ? 0.4 : 1,
              y: 0,
              scale: isDimmed ? 0.97 : 1,
            }}
            transition={{
              delay: i * 0.05,
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={isDimmed ? { opacity: 0.65, scale: 0.99 } : { y: -3 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onSelect(id)}
            className={`group relative overflow-hidden rounded-2xl border text-start p-5 sm:p-6 cursor-pointer transition-colors duration-400 ${
              isActive
                ? "bg-accent-light border-accent/20"
                : "bg-surface border-border hover:border-foreground/15"
            }`}
          >
            {/* Active indicator — accent line at top */}
            {isActive && (
              <motion.div
                layoutId="sector-active-bar"
                className="absolute top-0 inset-x-0 h-0.5 bg-accent"
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}

            <div className="relative">
              <div
                className={`mb-3 transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-muted group-hover:text-foreground/70"
                }`}
              >
                <Icon size={24} strokeWidth={3} aria-hidden="true" />
              </div>
              <span
                className={`text-sm font-medium block leading-snug transition-colors duration-300 ${
                  isActive ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                }`}
              >
                {t(`calculator.sectors.${id}`)}
              </span>
              <span className="text-[11px] text-muted mt-1 block">
                ~{sector.typicalEmployees} {t("calculator.inputs.employeesAvg")}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
