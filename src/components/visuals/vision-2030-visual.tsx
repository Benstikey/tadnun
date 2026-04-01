"use client";

import { useInView } from "@/hooks/use-in-view";

/** Vision 2030 countdown visual — animated radial growth. */
export function Vision2030Visual({ isFr }: { isFr: boolean }) {
  const { ref, inView: active } = useInView(0.3);

  const years = [
    { year: "2026", pct: 20, label: isFr ? "Aujourd'hui" : "Today" },
    { year: "2027", pct: 35 },
    { year: "2028", pct: 55 },
    { year: "2029", pct: 78 },
    { year: "2030", pct: 100, label: isFr ? "Coupe du Monde" : "World Cup" },
  ];

  const dots = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const r = 46;
    return { x: 50 + r * Math.cos(angle), y: 50 + r * Math.sin(angle), delay: i * 80 };
  });

  return (
    <div ref={ref} className="relative w-full max-w-[320px] mx-auto">
      <svg viewBox="0 0 100 100" className="w-full aspect-square">
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="34" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.3" />
        <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.3" />

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
