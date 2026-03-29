"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { InboxCounts } from "@/lib/types";

interface Props {
  counts: InboxCounts;
  activeFilter: string;
  activeStep: string;
}

const FILTERS = [
  { key: "all", label: "All" },
  { key: "sent", label: "Sent" },
  { key: "scheduled", label: "Scheduled" },
  { key: "failed", label: "Failed" },
];

const STEPS = [
  { key: "1", label: "Step 1 — Pain + Proof" },
  { key: "2", label: "Step 2 — Case Study" },
  { key: "3", label: "Step 3 — Breakup" },
];

export function InboxSidebar({ counts, activeFilter, activeStep }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all") params.delete("filter");
    else params.set("filter", filter);
    params.delete("step");
    params.delete("page");
    router.push(`/inbox?${params.toString()}`);
  }

  function setStep(step: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (step === activeStep) params.delete("step");
    else params.set("step", step);
    params.delete("filter");
    params.delete("page");
    router.push(`/inbox?${params.toString()}`);
  }

  function getCount(key: string): number {
    const map: Record<string, number> = {
      all: counts.all,
      sent: counts.sent,
      scheduled: counts.scheduled,
      failed: counts.failed,
    };
    return map[key] ?? 0;
  }

  function getStepCount(step: string): number {
    const map: Record<string, number> = { "1": counts.step1, "2": counts.step2, "3": counts.step3 };
    return map[step] ?? 0;
  }

  return (
    <div className="w-48 border-r border-[var(--border)] bg-[var(--surface)] flex-shrink-0 py-3 px-2">
      <div className="space-y-0.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-[13px] transition-colors ${
              activeFilter === f.key && !activeStep
                ? "bg-gray-100 font-medium text-[var(--foreground)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-50"
            }`}
          >
            <span>{f.label}</span>
            <span className="tabular-nums text-xs">{getCount(f.key)}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-[var(--border)] mt-3 pt-3">
        <p className="px-3 text-[11px] text-[var(--muted)] uppercase tracking-wider mb-1">By Step</p>
        <div className="space-y-0.5">
          {STEPS.map((s) => (
            <button
              key={s.key}
              onClick={() => setStep(s.key)}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-[13px] transition-colors ${
                activeStep === s.key
                  ? "bg-gray-100 font-medium text-[var(--foreground)]"
                  : "text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-gray-50"
              }`}
            >
              <span className="truncate">{s.label}</span>
              <span className="tabular-nums text-xs ml-1">{getStepCount(s.key)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
