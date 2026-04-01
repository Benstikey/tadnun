"use client";

import { useInView } from "@/hooks/use-in-view";

/** Animated urgency visual — circular gauge showing digitalization gap. */
export function UrgencyRace({ labels }: {
  labels: {
    competitors: string;
    yourBusiness: string;
    punchline: string;
    avgLabel: string;
  };
}) {
  const { ref, inView: active } = useInView(0.3);

  const size = 240;
  const outerStroke = 14;
  const innerStroke = 10;
  const outerR = (size - outerStroke) / 2;
  const innerR = outerR - outerStroke - 8;
  const outerCirc = 2 * Math.PI * outerR;
  const innerCirc = 2 * Math.PI * innerR;
  const arcFraction = 270 / 360;

  const competitorOffset = outerCirc - (72 / 100) * arcFraction * outerCirc;
  const yourOffset = innerCirc - (7 / 100) * arcFraction * innerCirc;

  return (
    <div ref={ref} className="rounded-2xl border border-background/10 bg-background/[0.04] p-6 sm:p-8 flex flex-col items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-[135deg]">
          <circle
            cx={size / 2} cy={size / 2} r={outerR}
            fill="none" stroke="rgba(255,255,255,0.06)"
            strokeWidth={outerStroke}
            strokeDasharray={`${arcFraction * outerCirc} ${outerCirc}`}
            strokeLinecap="round"
          />
          <circle
            cx={size / 2} cy={size / 2} r={outerR}
            fill="none" stroke="#34d399"
            strokeWidth={outerStroke}
            strokeDasharray={outerCirc}
            strokeDashoffset={active ? competitorOffset : outerCirc}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
          />
          <circle
            cx={size / 2} cy={size / 2} r={innerR}
            fill="none" stroke="rgba(255,255,255,0.04)"
            strokeWidth={innerStroke}
            strokeDasharray={`${arcFraction * innerCirc} ${innerCirc}`}
            strokeLinecap="round"
          />
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
