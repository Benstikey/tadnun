"use client";

import { useEffect, useState } from "react";

/* ── Animated progress bar ── */
function ProgressBar({ percent, color, delay }: { percent: number; color: string; delay: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(percent), delay);
    return () => clearTimeout(timer);
  }, [percent, delay]);
  return (
    <div className="h-1.5 w-full rounded-full bg-foreground/[0.06]">
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${width}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ── Status badge ── */
function StatusBadge({ status, label }: { status: "active" | "review" | "complete"; label: string }) {
  const styles = {
    active: "bg-accent/10 text-accent",
    review: "bg-amber-500/10 text-amber-600",
    complete: "bg-emerald-500/10 text-emerald-600",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold uppercase tracking-wider ${styles[status]}`}>
      {status === "active" && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-40 animate-ping" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
      )}
      {label}
    </span>
  );
}

/* ── Sector icon (small, inline) ── */
function SectorDot({ emoji }: { emoji: string }) {
  return (
    <span className="w-6 h-6 rounded-md bg-foreground/[0.04] flex items-center justify-center text-[11px] shrink-0">
      {emoji}
    </span>
  );
}

interface HeroDashboardProps {
  labels: {
    projects: string;
    activeProjects: string;
    sectors: string;
    completion: string;
    projectList: string;
    viewAll: string;
    live: string;
    statusActive: string;
    statusReview: string;
    statusComplete: string;
    projTraceability: string;
    projTraceabilityClient: string;
    projBooking: string;
    projBookingClient: string;
    projInventory: string;
    projInventoryClient: string;
    projPatient: string;
    projPatientClient: string;
    milestoneDeployed: string;
    milestoneTraining: string;
  };
}

export function HeroDashboard({ labels }: HeroDashboardProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const projects = [
    {
      emoji: "\u{1F33E}",
      name: labels.projTraceability,
      client: labels.projTraceabilityClient,
      status: "active" as const,
      statusLabel: labels.statusActive,
      progress: 72,
      color: "var(--color-accent, #c0392b)",
    },
    {
      emoji: "\u{1F3E8}",
      name: labels.projBooking,
      client: labels.projBookingClient,
      status: "review" as const,
      statusLabel: labels.statusReview,
      progress: 91,
      color: "#f59e0b",
    },
    {
      emoji: "\u{1F6D2}",
      name: labels.projInventory,
      client: labels.projInventoryClient,
      status: "active" as const,
      statusLabel: labels.statusActive,
      progress: 45,
      color: "var(--color-accent, #c0392b)",
    },
    {
      emoji: "\u{1FA7A}",
      name: labels.projPatient,
      client: labels.projPatientClient,
      status: "complete" as const,
      statusLabel: labels.statusComplete,
      progress: 100,
      color: "#22c55e",
    },
  ];

  return (
    <div
      className={`relative transition-all duration-1000 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {/* Mock browser chrome */}
      <div className="rounded-xl border border-border/80 bg-surface shadow-2xl shadow-foreground/[0.06] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/60 bg-surface/80">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-foreground/10" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex items-center gap-2 rounded-md bg-foreground/[0.04] px-3 py-1 text-[10px] text-muted font-mono">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" className="opacity-40">
                <path d="M4 8a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M14 14l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              app.tadnun.com/{labels.projects.toLowerCase()}
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-4 space-y-3">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-serif italic text-sm text-foreground">Tadnun</span>
              <span className="text-[9px] text-muted font-mono bg-foreground/[0.04] px-1.5 py-0.5 rounded">
                {labels.projects}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping bg-emerald-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[9px] text-muted">{labels.live}</span>
            </div>
          </div>

          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-foreground/[0.03] border border-border/40 px-3 py-2.5">
              <span className="text-[9px] text-muted uppercase tracking-wider">{labels.activeProjects}</span>
              <span className="mt-0.5 block text-lg font-serif italic text-foreground leading-none">12</span>
            </div>
            <div className="rounded-lg bg-foreground/[0.03] border border-border/40 px-3 py-2.5">
              <span className="text-[9px] text-muted uppercase tracking-wider">{labels.sectors}</span>
              <span className="mt-0.5 block text-lg font-serif italic text-foreground leading-none">6</span>
            </div>
            <div className="rounded-lg bg-foreground/[0.03] border border-border/40 px-3 py-2.5">
              <span className="text-[9px] text-muted uppercase tracking-wider">{labels.completion}</span>
              <span className="mt-0.5 block text-lg font-serif italic text-accent leading-none">84%</span>
            </div>
          </div>

          {/* Project list */}
          <div className="rounded-lg border border-border/40 overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 bg-foreground/[0.02] border-b border-border/30">
              <span className="text-[10px] font-medium text-foreground">{labels.projectList}</span>
              <span className="text-[9px] text-accent cursor-pointer">{labels.viewAll}</span>
            </div>
            <div className="divide-y divide-border/30">
              {projects.map((proj, i) => (
                <div
                  key={i}
                  className="px-3 py-2.5 transition-all duration-500"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(6px)",
                    transitionDelay: `${600 + i * 150}ms`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <SectorDot emoji={proj.emoji} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[11px] text-foreground font-medium leading-tight truncate">{proj.name}</p>
                        <StatusBadge status={proj.status} label={proj.statusLabel} />
                      </div>
                      <p className="text-[9px] text-muted mt-0.5">{proj.client}</p>
                    </div>
                  </div>
                  <div className="mt-2 ms-[34px]">
                    <ProgressBar percent={proj.progress} color={proj.color} delay={800 + i * 200} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating milestone notification */}
      <div
        className="absolute -bottom-3 -start-3 sm:-start-6 rounded-lg border border-border/80 bg-surface shadow-lg px-3 py-2 flex items-center gap-2.5 transition-all duration-700"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(8px) scale(0.95)",
          transitionDelay: "1600ms",
        }}
      >
        <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 8l3 3 5-5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-medium text-foreground leading-tight">{labels.milestoneDeployed}</p>
          <p className="text-[8px] text-muted">{labels.milestoneTraining}</p>
        </div>
      </div>

      {/* Floating sector count badge */}
      <div
        className="absolute -top-2 -end-2 sm:-end-4 rounded-lg border border-border/80 bg-surface shadow-lg px-2.5 py-1.5 transition-all duration-700"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.95)",
          transitionDelay: "1800ms",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1">
            {["\u{1F33E}", "\u{1F3E8}", "\u{1F6D2}", "\u{1FA7A}"].map((e, i) => (
              <span key={i} className="w-5 h-5 rounded-full bg-foreground/[0.05] border border-surface flex items-center justify-center text-[9px]">
                {e}
              </span>
            ))}
          </div>
          <span className="text-[9px] text-muted font-medium">+4</span>
        </div>
      </div>
    </div>
  );
}
