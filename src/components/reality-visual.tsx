"use client";

import { useEffect, useRef, useState } from "react";

interface RealityVisualProps {
  labels: {
    lostContracts: string;
    lostContractsValue: string;
    zeroPresence: string;
    zeroPresenceValue: string;
    commissions: string;
    commissionsValue: string;
    paperTrail: string;
  };
}

export function RealityVisual({ labels }: RealityVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setActive(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const items = [
    {
      value: labels.lostContractsValue,
      label: labels.lostContracts,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="15" x2="15" y2="15" />
        </svg>
      ),
      color: "var(--accent)",
    },
    {
      value: labels.zeroPresenceValue,
      label: labels.zeroPresence,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      ),
      color: "#d97706",
    },
    {
      value: labels.commissionsValue,
      label: labels.commissions,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      color: "#dc2626",
    },
  ];

  return (
    <div ref={ref} className="relative">
      {/* Paper texture card */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-accent/60" />
          <span className="text-[10px] font-mono tracking-widest text-muted uppercase">
            {labels.paperTrail}
          </span>
        </div>

        {/* Stat cards */}
        <div className="space-y-5">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-4 transition-all duration-600"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translateX(0)" : "translateX(12px)",
                transitionDelay: `${300 + i * 200}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `color-mix(in srgb, ${item.color} 10%, transparent)`, color: item.color }}
              >
                {item.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span
                  className="block text-2xl font-serif italic leading-none"
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
                <span className="mt-1.5 block text-[13px] text-muted leading-snug">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom divider + implied pattern */}
        <div className="mt-8 pt-5 border-t border-border/60">
          <div className="flex items-center gap-3">
            {/* Tiny bar chart showing decline */}
            <div className="flex items-end gap-[3px] h-6">
              {[85, 60, 40, 25, 12].map((h, i) => (
                <div
                  key={i}
                  className="w-[5px] rounded-sm transition-all duration-500"
                  style={{
                    height: active ? `${h}%` : "4px",
                    backgroundColor: `color-mix(in srgb, var(--accent) ${30 + i * 15}%, transparent)`,
                    transitionDelay: `${900 + i * 80}ms`,
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              ))}
            </div>
            <span
              className="text-[11px] text-muted/70 transition-opacity duration-500"
              style={{
                opacity: active ? 1 : 0,
                transitionDelay: "1300ms",
              }}
            >
              93% still at zero
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
