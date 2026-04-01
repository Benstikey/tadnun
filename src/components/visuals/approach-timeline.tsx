"use client";

import { useInView } from "@/hooks/use-in-view";

/** Approach steps as animated timeline. */
export function ApproachTimeline({
  steps,
}: {
  steps: { num: string; title: string; body: string }[];
}) {
  return (
    <div className="mt-16 relative">
      {/* Horizontal connector line (desktop) */}
      <div className="hidden sm:block absolute top-[28px] inset-x-0 h-px bg-border z-0" />

      <div className="grid sm:grid-cols-3 gap-10 sm:gap-0">
        {steps.map((step, i) => (
          <ScrollRevealInner key={i} delay={i * 150}>
            <div className="relative flex items-start gap-4 sm:flex-col sm:items-center sm:text-center sm:px-6">
              <div className="relative z-10 shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-background border-2 border-accent/30 flex items-center justify-center transition-colors">
                  <span className="font-serif italic text-base sm:text-lg text-accent">
                    {step.num}
                  </span>
                </div>
              </div>
              <div className="sm:mt-6">
                <h3 className="text-foreground font-semibold text-base sm:text-lg leading-snug">
                  {step.title}
                </h3>
                <p className="mt-2 sm:mt-3 text-muted text-[13px] sm:text-[14px] leading-relaxed sm:max-w-[280px]">
                  {step.body}
                </p>
              </div>
            </div>
          </ScrollRevealInner>
        ))}
      </div>
    </div>
  );
}

function ScrollRevealInner({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
