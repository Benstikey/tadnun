"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Stacked artifact cards representing each process step.
 * Shows what the client actually receives: a call, a proposal, a green light.
 */
export function ProcessVisual({ isFr }: { isFr: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setStep(3);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStep(1), 200);
          setTimeout(() => setStep(2), 700);
          setTimeout(() => setStep(3), 1200);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-[280px] mx-auto h-[320px]">
      {/* Card 1: Call interface */}
      <div
        className="absolute inset-x-0 top-0 rounded-xl border border-border bg-white p-5 shadow-sm"
        style={{
          opacity: step >= 1 ? 1 : 0,
          transform: step >= 1 ? "translateY(0) rotate(-1deg)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 3,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent, #C4553A)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-foreground">
              {isFr ? "Appel découverte" : "Discovery call"}
            </p>
            <p className="text-[10px] text-muted">15 min</p>
          </div>
        </div>
        {/* Fake agenda lines */}
        <div className="space-y-2">
          <div className="h-1.5 rounded-full bg-foreground/[0.06] w-full" />
          <div className="h-1.5 rounded-full bg-foreground/[0.04] w-4/5" />
          <div className="h-1.5 rounded-full bg-foreground/[0.03] w-3/5" />
        </div>
      </div>

      {/* Card 2: Proposal document */}
      <div
        className="absolute inset-x-2 top-[90px] rounded-xl border border-border bg-white p-5 shadow-sm"
        style={{
          opacity: step >= 2 ? 1 : 0,
          transform: step >= 2 ? "translateY(0) rotate(0.5deg)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 2,
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-foreground">
              {isFr ? "Proposition" : "Proposal"}
            </p>
            <p className="text-[10px] text-muted">PDF — 48h</p>
          </div>
        </div>
        {/* Fake proposal content */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-1.5 rounded-full bg-foreground/[0.06] w-2/5" />
            <div className="h-1.5 rounded-full bg-foreground/[0.04] w-1/5" />
          </div>
          <div className="flex justify-between items-center">
            <div className="h-1.5 rounded-full bg-foreground/[0.05] w-3/5" />
            <div className="h-1.5 rounded-full bg-foreground/[0.04] w-1/6" />
          </div>
          <div className="pt-1 border-t border-dashed border-foreground/[0.06] flex justify-between items-center">
            <div className="h-1.5 rounded-full bg-foreground/[0.08] w-1/4" />
            <div className="h-2 rounded-full bg-accent/20 w-1/5" />
          </div>
        </div>
      </div>

      {/* Card 3: Confirmation */}
      <div
        className="absolute inset-x-4 top-[195px] rounded-xl border border-emerald-200/60 bg-emerald-50/50 p-5 shadow-sm"
        style={{
          opacity: step >= 3 ? 1 : 0,
          transform: step >= 3 ? "translateY(0) rotate(-0.5deg)" : "translateY(24px)",
          transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          zIndex: 1,
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"
            style={{
              transform: step >= 3 ? "scale(1)" : "scale(0.5)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-emerald-800">
              {isFr ? "C'est parti !" : "Let's go!"}
            </p>
            <p className="text-[10px] text-emerald-600/70">
              {isFr ? "Projet lancé, sans surprise" : "Project launched, no surprises"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
