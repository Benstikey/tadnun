"use client";

import { useEffect, useRef, useState } from "react";
import { SectorIcon } from "@/components/icons";

const SECTORS = [
  "agriculture", "restaurants", "tourism", "healthcare",
  "retail", "education", "realestate", "logistics",
] as const;

// Positions around a circle (0° = top, clockwise)
const NODE_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];
const RADIUS = 130;
const CENTER = 200;

function polarToXY(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CENTER + RADIUS * Math.cos(rad), y: CENTER + RADIUS * Math.sin(rad) };
}

function eightPointStar(cx: number, cy: number, outer: number, inner: number) {
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const oA = ((i * 45 - 90) * Math.PI) / 180;
    const iA = (((i * 45 + 22.5) - 90) * Math.PI) / 180;
    pts.push(`${cx + outer * Math.cos(oA)},${cy + outer * Math.sin(oA)}`);
    pts.push(`${cx + inner * Math.cos(iA)},${cy + inner * Math.sin(iA)}`);
  }
  return pts.join(" ");
}

export function AllSectorsVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const nodes = NODE_ANGLES.map((a) => polarToXY(a));

  return (
    <div ref={containerRef} className="relative w-full max-w-[360px] mx-auto aspect-square">
      {/* SVG layer: lines, rings, center star, particles */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="asCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C4482A" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#C4482A" stopOpacity="0" />
          </radialGradient>
          <filter id="asSoftGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Background glow */}
        <circle cx={CENTER} cy={CENTER} r="140" fill="url(#asCenterGlow)"
          className={`transition-opacity duration-1000 ${visible ? "opacity-100" : "opacity-0"}`} />

        {/* Connection lines */}
        {nodes.map((n, i) => (
          <line key={`l-${i}`} x1={CENTER} y1={CENTER} x2={n.x} y2={n.y}
            stroke="#C4482A" strokeOpacity={visible ? 0.12 : 0} strokeWidth="1"
            strokeDasharray="4 4" className="transition-all duration-700"
            style={{ transitionDelay: `${i * 80 + 200}ms` }} />
        ))}

        {/* Orbital ring */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} fill="none" stroke="currentColor"
          strokeOpacity="0.06" strokeWidth="1" strokeDasharray="2 6"
          className={`transition-opacity duration-1000 text-foreground ${visible ? "opacity-100" : "opacity-0"}`} />

        {/* Center zellige star */}
        <g className={`transition-all duration-700 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
          style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}>
          <polygon points={eightPointStar(CENTER, CENTER, 28, 14)}
            fill="none" stroke="#C4482A" strokeWidth="1.5" strokeOpacity="0.5" />
          <polygon points={eightPointStar(CENTER, CENTER, 18, 9)}
            fill="#C4482A" fillOpacity="0.08" stroke="#C4482A" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx={CENTER} cy={CENTER} r="4" fill="#C4482A" fillOpacity="0.6" filter="url(#asSoftGlow)">
            <animate attributeName="r" values="4;6;4" dur="3s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" values="0.6;0.3;0.6" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Node backgrounds */}
        {nodes.map((n, i) => (
          <circle key={`bg-${i}`} cx={n.x} cy={n.y} r="22"
            fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.1"
            strokeWidth="1" className={`text-foreground transition-opacity duration-500 ${visible ? "opacity-100" : "opacity-0"}`}
            style={{ transitionDelay: `${i * 100 + 300}ms` }}>
            <animate attributeName="r" values="22;23.5;22" dur={`${4 + i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        ))}

        {/* Floating particles */}
        {[0, 2, 4, 6].map((i) => (
          <circle key={`p-${i}`} r="2" fill="#C4482A" fillOpacity="0.35">
            <animateMotion dur={`${3 + i * 0.3}s`} repeatCount="indefinite"
              path={`M${CENTER},${CENTER} L${nodes[i].x},${nodes[i].y}`} />
            <animate attributeName="fill-opacity" values="0;0.4;0" dur={`${3 + i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </svg>

      {/* HTML layer: SectorIcon components positioned over the SVG nodes */}
      {SECTORS.map((key, i) => {
        const n = nodes[i];
        // Convert SVG coords (0-400) to percentages
        const left = (n.x / 400) * 100;
        const top = (n.y / 400) * 100;
        return (
          <div key={key}
            className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 text-foreground/55 transition-all duration-500 ${visible ? "opacity-100 scale-100" : "opacity-0 scale-75"}`}
            style={{ left: `${left}%`, top: `${top}%`, transitionDelay: `${i * 100 + 300}ms` }}>
            <SectorIcon sectorKey={key} size={20} />
          </div>
        );
      })}
    </div>
  );
}
