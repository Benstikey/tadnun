"use client";

import { useEffect, useState } from "react";

/**
 * An editorial visual for the calculator promo section.
 * Overlapping metric fragments that animate on mount —
 * "before" numbers in muted tones shift to "after" numbers in accent,
 * suggesting the transformation from manual to digital.
 */

function CountTo({ target, delay, duration = 1200 }: { target: number; delay: number; duration?: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay, duration]);

  return <>{value.toLocaleString("fr-MA")}</>;
}

function FadeIn({
  children,
  delay,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}

export function CalculatorPromoVisual() {
  return (
    <div className="relative w-full h-full min-h-[280px] select-none" aria-hidden="true">
      {/* Decorative connecting line */}
      <svg
        className="absolute inset-0 w-full h-full text-border"
        viewBox="0 0 300 280"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M60 220 Q120 180 150 120 Q180 60 240 50"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.5"
        />
      </svg>

      {/* "Before" — muted, positioned lower-left */}
      <FadeIn delay={200} className="absolute bottom-8 left-4 sm:left-8">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[40px] sm:text-[48px] font-serif italic text-foreground/10 leading-none font-tabular">
            32
          </span>
          <span className="text-[11px] text-foreground/15 font-mono tracking-wider">
            h / sem
          </span>
        </div>
        <p className="text-[10px] text-foreground/15 mt-1 font-mono tracking-wider uppercase">
          travail manuel
        </p>
      </FadeIn>

      {/* "After" — accent, positioned upper-right */}
      <FadeIn delay={600} className="absolute top-6 right-4 sm:right-8 text-end">
        <div className="flex items-baseline gap-1.5 justify-end">
          <span className="text-[11px] text-accent/50 font-mono tracking-wider">
            -
          </span>
          <span className="text-[48px] sm:text-[56px] font-serif italic text-accent leading-none font-tabular">
            <CountTo target={12} delay={800} />
          </span>
          <span className="text-[11px] text-accent/50 font-mono tracking-wider">
            h
          </span>
        </div>
        <p className="text-[10px] text-accent/40 mt-1 font-mono tracking-wider uppercase">
          économisées
        </p>
      </FadeIn>

      {/* Central metric — the money saved */}
      <FadeIn delay={900} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-xl border border-accent/15 bg-surface px-5 py-4 text-center shadow-sm">
          <span className="text-[10px] text-muted font-mono tracking-wider uppercase block mb-1">
            /mois
          </span>
          <div className="flex items-baseline gap-1 justify-center">
            <span className="text-[28px] sm:text-[32px] font-bold text-accent font-tabular leading-none">
              <CountTo target={8400} delay={1100} duration={1400} />
            </span>
            <span className="text-xs text-accent/60 font-medium">
              MAD
            </span>
          </div>
        </div>
      </FadeIn>

      {/* Small floating detail — clients */}
      <FadeIn delay={1300} className="absolute bottom-12 right-6 sm:right-12">
        <div className="flex items-center gap-2 rounded-full bg-success-light px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-success" />
          <span className="text-[11px] font-medium text-success">
            +<CountTo target={7} delay={1400} duration={600} /> clients
          </span>
        </div>
      </FadeIn>

      {/* Small floating detail — efficiency */}
      <FadeIn delay={1500} className="absolute top-10 left-6 sm:left-12">
        <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
          <span className="text-[11px] text-muted">
            ×<CountTo target={3} delay={1600} duration={500} /> plus rapide
          </span>
        </div>
      </FadeIn>
    </div>
  );
}
