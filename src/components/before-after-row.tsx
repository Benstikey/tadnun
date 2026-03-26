"use client";

import { useEffect, useRef, useState } from "react";

export function BeforeAfterRow({
  before,
  after,
  delay = 0,
}: {
  before: string;
  after: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"hidden" | "before" | "after">("hidden");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setPhase("after");
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Show "before" first, then transition to "after"
          setTimeout(() => setPhase("before"), delay);
          setTimeout(() => setPhase("after"), delay + 800);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    // Check if already in viewport
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setTimeout(() => setPhase("before"), delay);
      setTimeout(() => setPhase("after"), delay + 800);
    } else {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="grid sm:grid-cols-2 gap-px bg-border rounded-xl overflow-hidden"
      style={{
        opacity: phase === "hidden" ? 0 : 1,
        transform: phase === "hidden" ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Before */}
      <div
        className="bg-surface p-5 flex items-center gap-3 relative overflow-hidden"
      >
        <span className="shrink-0 w-6 h-6 rounded-full bg-red-50 text-accent text-xs flex items-center justify-center font-medium">
          &times;
        </span>
        <p
          className="text-[14px] transition-all duration-500"
          style={{
            opacity: phase === "after" ? 0.45 : 0.7,
            textDecorationLine: phase === "after" ? "line-through" : "none",
            textDecorationColor: "var(--accent)",
            textDecorationStyle: "solid" as const,
          }}
        >
          {before}
        </p>
      </div>

      {/* After */}
      <div className="bg-surface p-5 flex items-center gap-3">
        <span
          className="shrink-0 w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium transition-all duration-500"
          style={{
            backgroundColor: phase === "after" ? "rgb(209 250 229)" : "rgb(243 244 246)",
            color: phase === "after" ? "rgb(22 163 74)" : "var(--muted)",
            transform: phase === "after" ? "scale(1)" : "scale(0.8)",
          }}
        >
          &#x2713;
        </span>
        <p
          className="text-[14px] font-medium transition-all duration-500"
          style={{
            opacity: phase === "after" ? 1 : 0.4,
            transform: phase === "after" ? "translateX(0)" : "translateX(-4px)",
          }}
        >
          {after}
        </p>
      </div>
    </div>
  );
}
