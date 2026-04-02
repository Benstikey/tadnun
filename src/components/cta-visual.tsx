"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Zellige-inspired visual for the CTA section.
 * 4 diamond tiles converge toward a central point, with floating
 * integration badges — representing how Tadnun brings everything together.
 */
export function CtaVisual() {
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

  const badges = [
    { label: "WhatsApp", x: 8, y: 10 },
    { label: "Google Maps", x: 68, y: 5 },
    { label: "CMI", x: 78, y: 72 },
    { label: "Analytics", x: 2, y: 68 },
  ];

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[320px] mx-auto aspect-square"
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Outer subtle ring */}
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.3"
          opacity={active ? 0.08 : 0}
          style={{ transition: "opacity 1s ease 200ms" }}
        />
        <circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          opacity={active ? 0.05 : 0}
          style={{ transition: "opacity 1s ease 400ms" }}
        />

        {/* Top diamond */}
        <path
          d="M100 30 L130 60 L100 90 L70 60 Z"
          fill="currentColor"
          opacity={active ? 0.08 : 0}
          style={{
            transition: "opacity 0.8s ease 300ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
            transform: active ? "translateY(0)" : "translateY(-12px)",
            transformOrigin: "100px 60px",
          }}
        />
        <path
          d="M100 30 L130 60 L100 90 L70 60 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity={active ? 0.2 : 0}
          style={{
            transition: "opacity 0.8s ease 300ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 300ms",
            transform: active ? "translateY(0)" : "translateY(-12px)",
            transformOrigin: "100px 60px",
          }}
        />

        {/* Right diamond */}
        <path
          d="M110 100 L140 70 L170 100 L140 130 Z"
          fill="currentColor"
          opacity={active ? 0.06 : 0}
          style={{
            transition: "opacity 0.8s ease 500ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 500ms",
            transform: active ? "translateX(0)" : "translateX(12px)",
            transformOrigin: "140px 100px",
          }}
        />
        <path
          d="M110 100 L140 70 L170 100 L140 130 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity={active ? 0.2 : 0}
          style={{
            transition: "opacity 0.8s ease 500ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 500ms",
            transform: active ? "translateX(0)" : "translateX(12px)",
            transformOrigin: "140px 100px",
          }}
        />

        {/* Bottom diamond */}
        <path
          d="M70 140 L100 110 L130 140 L100 170 Z"
          fill="currentColor"
          opacity={active ? 0.05 : 0}
          style={{
            transition: "opacity 0.8s ease 700ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 700ms",
            transform: active ? "translateY(0)" : "translateY(12px)",
            transformOrigin: "100px 140px",
          }}
        />
        <path
          d="M70 140 L100 110 L130 140 L100 170 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity={active ? 0.2 : 0}
          style={{
            transition: "opacity 0.8s ease 700ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 700ms",
            transform: active ? "translateY(0)" : "translateY(12px)",
            transformOrigin: "100px 140px",
          }}
        />

        {/* Left diamond */}
        <path
          d="M30 100 L60 70 L90 100 L60 130 Z"
          fill="currentColor"
          opacity={active ? 0.07 : 0}
          style={{
            transition: "opacity 0.8s ease 600ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 600ms",
            transform: active ? "translateX(0)" : "translateX(-12px)",
            transformOrigin: "60px 100px",
          }}
        />
        <path
          d="M30 100 L60 70 L90 100 L60 130 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity={active ? 0.2 : 0}
          style={{
            transition: "opacity 0.8s ease 600ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 600ms",
            transform: active ? "translateX(0)" : "translateX(-12px)",
            transformOrigin: "60px 100px",
          }}
        />

        {/* Terracotta accent petals between diamonds */}
        <path
          d="M100 90 L130 60 L140 70 L110 100 Z"
          fill="var(--accent, #C4553A)"
          opacity={active ? 0.25 : 0}
          style={{ transition: "opacity 0.6s ease 900ms" }}
        />
        <path
          d="M110 100 L140 130 L130 140 L100 110 Z"
          fill="var(--accent, #C4553A)"
          opacity={active ? 0.2 : 0}
          style={{ transition: "opacity 0.6s ease 1000ms" }}
        />
        <path
          d="M100 110 L70 140 L60 130 L90 100 Z"
          fill="var(--accent, #C4553A)"
          opacity={active ? 0.18 : 0}
          style={{ transition: "opacity 0.6s ease 1100ms" }}
        />
        <path
          d="M90 100 L60 70 L70 60 L100 90 Z"
          fill="var(--accent, #C4553A)"
          opacity={active ? 0.22 : 0}
          style={{ transition: "opacity 0.6s ease 1200ms" }}
        />

        {/* Center dot */}
        <circle
          cx="100"
          cy="100"
          r="4"
          fill="var(--accent, #C4553A)"
          opacity={active ? 0.6 : 0}
          style={{
            transition: "opacity 0.5s ease 800ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) 800ms",
            transform: active ? "scale(1)" : "scale(0)",
            transformOrigin: "100px 100px",
          }}
        />

        {/* Pulse ring */}
        <circle
          cx="100"
          cy="100"
          r="4"
          fill="none"
          stroke="var(--accent, #C4553A)"
          strokeWidth="0.5"
          opacity={active ? 0.3 : 0}
          style={{
            transformOrigin: "100px 100px",
            animation: active ? "cta-pulse 3s ease-in-out 1.5s infinite" : "none",
          }}
        />
      </svg>

      {/* Floating integration badges */}
      {badges.map((badge, i) => (
        <div
          key={badge.label}
          className="absolute flex items-center gap-1.5 rounded-full bg-surface border border-border px-2.5 py-1 shadow-sm text-[10px] text-foreground/60 font-medium pointer-events-none whitespace-nowrap"
          style={{
            left: `${badge.x}%`,
            top: `${badge.y}%`,
            opacity: active ? 0.8 : 0,
            transform: active ? "scale(1)" : "scale(0.8)",
            transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${1000 + i * 150}ms`,
            animation: active
              ? `cta-float-${i % 2 === 0 ? "a" : "b"} 5s ease-in-out ${i * 0.7}s infinite`
              : "none",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
          {badge.label}
        </div>
      ))}

      <style jsx>{`
        @keyframes cta-pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(3); opacity: 0; }
        }
        @keyframes cta-float-a {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1) translateY(-4px); }
        }
        @keyframes cta-float-b {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1) translateY(4px); }
        }
      `}</style>
    </div>
  );
}
