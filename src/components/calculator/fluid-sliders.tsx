"use client";

import { motion } from "framer-motion";
import type { SectorId, CalculatorInputs } from "@/data/calculator-data";

interface FluidSlidersProps {
  sectorId: SectorId;
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
  t: (key: string) => string;
}

const ease = [0.16, 1, 0.3, 1] as const;

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  delay,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
  delay: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <motion.label
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease }}
      className="block space-y-2 cursor-pointer"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[13px] text-muted">{label}</span>
        <span className="text-base font-semibold text-foreground font-tabular">
          {value.toLocaleString("fr-MA")}
          {unit && (
            <span className="text-xs text-muted font-normal ms-1">{unit}</span>
          )}
        </span>
      </div>
      <div className="relative h-8 flex items-center">
        <div className="absolute inset-x-0 h-[3px] rounded-full bg-border/50" />
        <div
          className="absolute h-[3px] rounded-full bg-accent/50 transition-all duration-100"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="relative w-full h-8 appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-accent
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-surface
            [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:scale-125
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-accent
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-surface
            [&::-moz-range-thumb]:shadow-md"
        />
      </div>
    </motion.label>
  );
}

export function FluidSliders({ sectorId, inputs, onChange, t }: FluidSlidersProps) {
  return (
    <div className="space-y-6">
      <p className="text-[13px] text-muted">
        {t("calculator.inputsTitle")}
      </p>

      <Slider
        label={t("calculator.inputs.employees")}
        value={inputs.employees}
        min={1}
        max={50}
        step={1}
        unit=""
        onChange={(v) => onChange({ ...inputs, employees: v })}
        delay={0.05}
      />
      <Slider
        label={t("calculator.inputs.avgRevenue")}
        value={inputs.avgRevenuePerClient}
        min={50}
        max={2000}
        step={50}
        unit="MAD"
        onChange={(v) => onChange({ ...inputs, avgRevenuePerClient: v })}
        delay={0.1}
      />
    </div>
  );
}
