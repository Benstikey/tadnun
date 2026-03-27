"use client";

import { useState, useEffect, useRef } from "react";
import { SectorIcon } from "@/components/icons";

export type SectorSlide = {
  key: string;
  name: string;
  tagline: string;
  quote: string;
  stats: { value: string; label: string }[];
};

interface Props {
  slides: SectorSlide[];
}

const DURATION = 3500;

export function SectorsHeroVisual({ slides }: Props) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<number>(Date.now());
  const pausedAtRef = useRef(0);
  const slidesLenRef = useRef(slides.length);
  slidesLenRef.current = slides.length;

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const scheduleAdvance = (fromMs: number) => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        setActive(prev => (prev + 1) % slidesLenRef.current);
        setVisible(true);
      }, 220);
    }, DURATION - fromMs);
  };

  // Fresh start when slide changes
  useEffect(() => {
    pausedAtRef.current = 0;
    startRef.current = Date.now();
    if (!paused) scheduleAdvance(0);
    return clearTimer;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handleMouseEnter = () => {
    setPaused(true);
    pausedAtRef.current = Math.min(Date.now() - startRef.current, DURATION);
    clearTimer();
  };

  const handleMouseLeave = () => {
    setPaused(false);
    startRef.current = Date.now() - pausedAtRef.current;
    scheduleAdvance(pausedAtRef.current);
  };

  const handleSelect = (i: number) => {
    if (i === active) return;
    clearTimer();
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 180);
  };

  const cur = slides[active];

  const renderSlide = (s: SectorSlide) => (
    <>
      {/* Sector header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
          style={{ background: "rgba(196, 85, 58, 0.12)", color: "var(--accent)" }}>
          <SectorIcon sectorKey={s.key as Parameters<typeof SectorIcon>[0]["sectorKey"]} size={20} />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white leading-tight">{s.name}</p>
          <p className="text-[10px] text-white/35 font-mono tracking-widest mt-0.5 uppercase">{s.tagline}</p>
        </div>
      </div>
      {/* Quote */}
      <div className="rounded-xl p-4 mb-5" style={{ background: "rgba(255,255,255,0.04)" }}>
        <p className="text-[13px] text-white/65 italic leading-relaxed line-clamp-2">
          &ldquo;{s.quote}&rdquo;
        </p>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2.5">
        {s.stats.map((stat, i) => (
          <div key={i} className="rounded-lg p-3 text-center"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <span className="block text-[22px] font-serif italic leading-none" style={{ color: "var(--accent)" }}>
              {stat.value}
            </span>
            <span className="block text-[10px] text-white/35 mt-1.5 leading-tight">{stat.label}</span>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div
      className="relative select-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow */}
      <div
        className="absolute -inset-8 rounded-3xl opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 60% 40%, var(--accent) 0%, transparent 70%)" }}
      />

      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
        style={{ background: "linear-gradient(145deg, #1a1a1a 0%, #111111 100%)" }}>

        {/* Sector selector tabs — 4 per row */}
        <div className="grid grid-cols-4 border-b border-white/8">
          {slides.map((s, i) => (
            <button
              key={s.key}
              onClick={() => handleSelect(i)}
              title={s.name}
              className={`relative py-4 flex flex-col items-center gap-1 transition-all duration-200 cursor-pointer ${
                i === active
                  ? "bg-white/8 text-white"
                  : "text-white/30 hover:text-white/60 hover:bg-white/4"
              }`}
            >
              <SectorIcon sectorKey={s.key as Parameters<typeof SectorIcon>[0]["sectorKey"]} size={22} />
              {i === active && (
                <div className="absolute bottom-0 inset-x-0 h-0.5 bg-accent" />
              )}
            </button>
          ))}
        </div>

        {/* Content — slide 0 is in-flow (sets container height to tallest),
             all others are absolute overlays. Height never shifts. */}
        <div className="relative p-7">
          {slides.map((s, i) => (
            <div
              key={s.key}
              aria-hidden={i !== active}
              className="transition-all duration-200"
              style={{
                opacity: i === active && visible ? 1 : 0,
                transform: i === active && visible ? "translateY(0)" : "translateY(5px)",
                pointerEvents: i === active ? "auto" : "none",
                ...(i > 0 ? { position: "absolute" as const, top: 28, left: 28, right: 28 } : {}),
              }}
            >
              {renderSlide(s)}
            </div>
          ))}
        </div>

        {/* Progress bar — pure CSS animation, zero JS re-renders */}
        <div className="h-[2px] bg-white/6">
          <div
            key={active}
            className="h-full"
            style={{
              background: "var(--accent)",
              animation: `progressFill ${DURATION}ms linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className="transition-all duration-300"
            style={{
              width: i === active ? "20px" : "6px",
              height: "6px",
              borderRadius: "99px",
              background: i === active ? "var(--accent)" : "var(--border)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
