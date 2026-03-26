"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Visual components that explain Tadnun's value proposition
 * without relying on text. Pure CSS/SVG diagrams.
 */

/** Animated number counter — counts up when element enters viewport */
export function AnimatedStat({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const el = ref.current;
    if (!el) return;

    const animate = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      // Extract numeric part and suffix
      const match = value.match(/^([0-9,.]+)(.*)$/);
      if (!match) return;

      const numStr = match[1].replace(/,/g, "");
      const suffix = match[2]; // e.g., "%", "+", "x"
      const hasComma = match[1].includes(",");
      const target = parseFloat(numStr);
      const isInt = !numStr.includes(".");
      const decimals = isInt ? 0 : (numStr.split(".")[1]?.length || 0);

      const duration = 1200;
      const start = performance.now();

      const step = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease out
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = target * eased;

        let formatted = isInt ? Math.round(current).toString() : current.toFixed(decimals);
        if (hasComma) {
          formatted = Number(formatted).toLocaleString("en-US");
        }
        setDisplay(formatted + suffix);

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref} className={className}>{display}</span>;
}

/** Vertical animated process diagram — chaos → Tadnun → order */
export function ProcessDiagram({ isFr }: { isFr: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 to 3 (stages revealed)

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setProgress(3); return; }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger reveal: 0 → 1 → 2 → 3
          setTimeout(() => setProgress(1), 200);
          setTimeout(() => setProgress(2), 600);
          setTimeout(() => setProgress(3), 1000);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const beforeItems = [
    isFr ? "Carnets papier" : "Paper notebooks",
    isFr ? "Appels manques" : "Missed calls",
    isFr ? "Stock au feeling" : "Gut-feeling stock",
    isFr ? "Zero visibilite" : "Zero visibility",
  ];

  const afterItems = [
    isFr ? "Tout automatise" : "Everything automated",
    isFr ? "Clients fideles" : "Loyal customers",
    isFr ? "Stock en temps reel" : "Real-time stock",
    isFr ? "Donnees claires" : "Clear data",
  ];

  const badges = [
    { label: "Google Maps", x: -20, y: 8 },
    { label: "WhatsApp", x: 75, y: -5 },
    { label: "CMI", x: -15, y: 65 },
    { label: "Glovo", x: 80, y: 55 },
  ];

  return (
    <div ref={ref} className="flex flex-col items-center gap-0 py-8 lg:py-4 relative">
      {/* Stage 1: BEFORE — chaos */}
      <div
        className="w-full max-w-[260px] rounded-2xl border border-accent/20 bg-accent/[0.03] p-5 transition-all duration-700"
        style={{
          opacity: progress >= 1 ? 1 : 0,
          transform: progress >= 1 ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-accent/70 mb-3">
          {isFr ? "Aujourd'hui" : "Today"}
        </p>
        <div className="space-y-2">
          {beforeItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[12px] text-foreground/45"
              style={{
                opacity: progress >= 1 ? 1 : 0,
                transform: progress >= 1 ? "translateX(0)" : "translateX(-8px)",
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${200 + i * 80}ms`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent/30 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow down + gradient line */}
      <div
        className="flex flex-col items-center py-2 transition-all duration-500"
        style={{ opacity: progress >= 2 ? 1 : 0 }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-accent/20 to-foreground/30" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-foreground/30">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Stage 2: TADNUN — the bridge */}
      <div
        className="w-full max-w-[260px] rounded-2xl bg-foreground text-background p-5 flex flex-col items-center text-center transition-all duration-700"
        style={{
          opacity: progress >= 2 ? 1 : 0,
          transform: progress >= 2 ? "scale(1)" : "scale(0.95)",
        }}
      >
        <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center mb-2">
          <span className="font-serif italic text-base">T</span>
        </div>
        <p className="font-serif italic text-base">Tadnun</p>
        <p className="text-[10px] text-background/40 mt-0.5">
          {isFr ? "On connecte tout" : "We connect everything"}
        </p>
      </div>

      {/* Floating integration badges */}
      {badges.map((badge, i) => (
        <div
          key={badge.label}
          className="absolute hidden lg:flex items-center gap-1.5 rounded-full bg-surface border border-border px-3 py-1.5 shadow-sm text-[10px] text-foreground/60 font-medium pointer-events-none"
          style={{
            left: `${badge.x}%`,
            top: `${badge.y}%`,
            opacity: progress >= 2 ? 0.85 : 0,
            transform: progress >= 2 ? "scale(1)" : "scale(0.8)",
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${600 + i * 150}ms`,
            animation: progress >= 2 ? `float-badge-${i % 2 === 0 ? "a" : "b"} 4s ease-in-out ${i * 0.5}s infinite` : "none",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent/40" />
          {badge.label}
        </div>
      ))}

      {/* Arrow down + gradient line */}
      <div
        className="flex flex-col items-center py-2 transition-all duration-500"
        style={{ opacity: progress >= 3 ? 1 : 0 }}
      >
        <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-emerald-400/40" />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="text-emerald-500/50">
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Stage 3: AFTER — digital order */}
      <div
        className="w-full max-w-[260px] rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5 transition-all duration-700"
        style={{
          opacity: progress >= 3 ? 1 : 0,
          transform: progress >= 3 ? "translateY(0)" : "translateY(-16px)",
        }}
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 mb-3">
          {isFr ? "Demain" : "Tomorrow"}
        </p>
        <div className="space-y-2">
          {afterItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 text-[12px] text-emerald-800 font-medium"
              style={{
                opacity: progress >= 3 ? 1 : 0,
                transform: progress >= 3 ? "translateX(0)" : "translateX(8px)",
                transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${200 + i * 80}ms`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Visual representation of integrations as a connected hub */
export function IntegrationHub({ isFr }: { isFr: boolean }) {
  const nodes = [
    { label: "Google Maps", angle: 0 },
    { label: "WhatsApp", angle: 45 },
    { label: "CMI", angle: 90 },
    { label: "Glovo", angle: 135 },
    { label: isFr ? "Votre site" : "Your site", angle: 180 },
    { label: "Instagram", angle: 225 },
    { label: "AMO/CNSS", angle: 270 },
    { label: isFr ? "Caisse" : "POS", angle: 315 },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square my-12">
      {/* Center hub */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-foreground text-background flex items-center justify-center z-10">
        <span className="font-serif italic text-sm">Tadnun</span>
      </div>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const r = 42; // % from center
        const rad = (node.angle * Math.PI) / 180;
        const x = 50 + r * Math.cos(rad);
        const y = 50 + r * Math.sin(rad);

        return (
          <div key={i}>
            {/* Connection line */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
            >
              <line
                x1="50"
                y1="50"
                x2={x}
                y2={y}
                stroke="var(--border)"
                strokeWidth="0.3"
                strokeDasharray="1.5 1"
              />
            </svg>
            {/* Node */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 bg-surface border border-border rounded-lg px-3 py-1.5 text-[11px] font-medium text-foreground/70 whitespace-nowrap"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {node.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** Approach steps as animated timeline — line draws itself on scroll */
export function ApproachTimeline({
  steps,
}: {
  steps: { num: string; title: string; body: string }[];
}) {
  return (
    <div className="mt-16 grid sm:grid-cols-3 gap-6">
      {steps.map((step, i) => (
        <ScrollRevealInner key={i} delay={i * 120}>
          <div className="relative rounded-2xl border border-border bg-surface p-7 h-full">
            {/* Step number */}
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-serif italic text-sm">
              {step.num}
            </span>
            {/* Arrow connector (hidden on last) */}
            {i < steps.length - 1 && (
              <div className="hidden sm:block absolute top-10 -end-3 z-10 w-6 h-6 text-border rtl:-scale-x-100">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
            <h3 className="text-foreground font-medium text-lg mt-4">
              {step.title}
            </h3>
            <p className="mt-2 text-muted text-[14px] leading-relaxed">
              {step.body}
            </p>
          </div>
        </ScrollRevealInner>
      ))}
    </div>
  );
}

/** Lightweight scroll reveal for inner elements */
function ScrollRevealInner({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setVisible(true); return; }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/** Vision 2030 countdown visual — animated radial growth */
export function Vision2030Visual({ isFr }: { isFr: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setActive(true); return; }

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

  // Rings represent years — each year closer to 2030 adds a ring
  const years = [
    { year: "2026", pct: 20, label: isFr ? "Aujourd'hui" : "Today" },
    { year: "2027", pct: 35 },
    { year: "2028", pct: 55 },
    { year: "2029", pct: 78 },
    { year: "2030", pct: 100, label: isFr ? "Coupe du Monde" : "World Cup" },
  ];

  // Connection dots that appear around the circle
  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r = 46;
    return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle), delay: i * 80 };
  });

  return (
    <div ref={ref} className="relative w-full max-w-[320px] mx-auto">
      {/* SVG rings */}
      <svg viewBox="0 0 100 100" className="w-full aspect-square">
        {/* Background ring */}
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />

        {/* Progress arc — fills to show countdown */}
        <circle
          cx="50" cy="50" r="42"
          fill="none"
          stroke="rgba(212,69,59,0.5)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 42}`}
          strokeDashoffset={active ? `${2 * Math.PI * 42 * 0.07}` : `${2 * Math.PI * 42}`}
          style={{
            transition: "stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        {/* Connection dots — appear one by one */}
        {dots.map((dot, i) => (
          <circle
            key={i}
            cx={dot.x}
            cy={dot.y}
            r={active ? 1.2 : 0}
            fill={i < 9 ? "rgba(255,255,255,0.25)" : "rgba(212,69,59,0.7)"}
            style={{
              transition: `r 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${400 + dot.delay}ms`,
            }}
          />
        ))}

        {/* Center text */}
        <text
          x="50" y="46"
          textAnchor="middle"
          fill="white"
          fontSize="12"
          fontFamily="var(--font-serif)"
          fontStyle="italic"
          style={{
            opacity: active ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 800ms",
          }}
        >
          2030
        </text>
        <text
          x="50" y="57"
          textAnchor="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize="3.5"
          fontFamily="var(--font-mono)"
          letterSpacing="0.1"
          style={{
            opacity: active ? 1 : 0,
            transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 1000ms",
          }}
        >
          {isFr ? "COUPE DU MONDE" : "WORLD CUP"}
        </text>
      </svg>

      {/* Year markers below */}
      <div className="flex justify-between mt-4 px-2">
        {years.map((y, i) => (
          <div
            key={y.year}
            className="flex flex-col items-center"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translateY(0)" : "translateY(6px)",
              transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${800 + i * 200}ms`,
            }}
          >
            <div
              className="w-1 h-1 rounded-full mb-1.5"
              style={{
                backgroundColor: y.year === "2030" ? "rgba(212,69,59,0.8)" : "rgba(255,255,255,0.2)",
              }}
            />
            <span
              className="text-[10px] font-mono"
              style={{
                color: y.year === "2030" ? "rgba(212,69,59,0.9)" : "rgba(255,255,255,0.35)",
                fontWeight: y.year === "2030" ? 600 : 400,
              }}
            >
              {y.year}
            </span>
            {y.label && (
              <span className="text-[8px] text-background/25 mt-0.5">{y.label}</span>
            )}
          </div>
        ))}
      </div>

      {/* Pulsing "businesses going online" counter */}
      <div
        className="mt-6 text-center"
        style={{
          opacity: active ? 1 : 0,
          transition: "opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 2s",
        }}
      >
        <p className="text-[11px] text-background/30 font-mono uppercase tracking-wider">
          {isFr ? "Entreprises prêtes" : "Businesses ready"}
        </p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-6 rounded-sm"
                style={{
                  backgroundColor: i < 1 ? "rgba(212,69,59,0.6)" : "rgba(255,255,255,0.06)",
                  transition: `background-color 0.3s ${2200 + i * 50}ms`,
                }}
              />
            ))}
          </div>
          <span className="text-[11px] text-background/40 font-mono">7%</span>
        </div>
      </div>
    </div>
  );
}

/** Animated urgency visual — circular gauge showing digitalization gap */
export function UrgencyRace({ labels }: {
  labels: {
    competitors: string;
    yourBusiness: string;
    punchline: string;
    avgLabel: string;
  };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setActive(true); return; }

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

  // SVG arc math — 270° arc
  const size = 240;
  const outerStroke = 14;
  const innerStroke = 10;
  const outerR = (size - outerStroke) / 2;
  const innerR = outerR - outerStroke - 8;
  const outerCirc = 2 * Math.PI * outerR;
  const innerCirc = 2 * Math.PI * innerR;
  const arcFraction = 270 / 360; // 0.75

  // Proportional to 100%: competitor fills 72% of arc, you fill 7% of arc
  const competitorOffset = outerCirc - (72 / 100) * arcFraction * outerCirc;
  const yourOffset = innerCirc - (7 / 100) * arcFraction * innerCirc;

  return (
    <div ref={ref} className="rounded-2xl border border-background/10 bg-background/[0.04] p-6 sm:p-8 flex flex-col items-center gap-6">
      {/* Circular gauge */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-[135deg]">
          {/* Outer track */}
          <circle
            cx={size / 2} cy={size / 2} r={outerR}
            fill="none" stroke="rgba(255,255,255,0.06)"
            strokeWidth={outerStroke}
            strokeDasharray={`${arcFraction * outerCirc} ${outerCirc}`}
            strokeLinecap="round"
          />
          {/* Outer arc — competitors 72% */}
          <circle
            cx={size / 2} cy={size / 2} r={outerR}
            fill="none" stroke="#34d399"
            strokeWidth={outerStroke}
            strokeDasharray={outerCirc}
            strokeDashoffset={active ? competitorOffset : outerCirc}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
          />
          {/* Inner track */}
          <circle
            cx={size / 2} cy={size / 2} r={innerR}
            fill="none" stroke="rgba(255,255,255,0.04)"
            strokeWidth={innerStroke}
            strokeDasharray={`${arcFraction * innerCirc} ${innerCirc}`}
            strokeLinecap="round"
          />
          {/* Inner arc — your business 7% */}
          <circle
            cx={size / 2} cy={size / 2} r={innerR}
            fill="none" stroke="#f87171"
            strokeWidth={innerStroke}
            strokeDasharray={innerCirc}
            strokeDashoffset={active ? yourOffset : innerCirc}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1) 0.8s" }}
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] text-background/30 uppercase tracking-wider mb-1">vs</span>
          <div className="flex items-baseline gap-1">
            <span
              className="text-3xl font-serif italic leading-none transition-all duration-1000"
              style={{ color: active ? "#f87171" : "rgba(255,255,255,0.15)", transitionDelay: "1s" }}
            >
              7<span className="text-lg">%</span>
            </span>
          </div>
          <span className="text-[9px] text-background/35 mt-1">{labels.yourBusiness}</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          <div>
            <span className="text-[10px] text-background/40">{labels.competitors}</span>
            <span className="ms-1.5 text-[12px] font-serif italic text-emerald-400">72%</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div>
            <span className="text-[10px] text-background/40">{labels.yourBusiness}</span>
            <span className="ms-1.5 text-[12px] font-serif italic text-red-400">7%</span>
          </div>
        </div>
      </div>

      {/* Punchline */}
      <p
        className="text-[13px] text-background/50 leading-relaxed text-center pt-4 border-t border-background/[0.06] w-full"
        style={{
          opacity: active ? 1 : 0,
          transform: active ? "translateY(0)" : "translateY(6px)",
          transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 2.2s",
        }}
      >
        {labels.punchline}
      </p>
    </div>
  );
}
