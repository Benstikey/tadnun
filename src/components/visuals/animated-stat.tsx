"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";

/** Animated number counter — counts up when element enters viewport. */
export function AnimatedStat({ value, className = "" }: { value: string; className?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.3);
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const match = value.match(/^([0-9,.]+)(.*)$/);
    if (!match) return;

    const numStr = match[1].replace(/,/g, "");
    const suffix = match[2];
    const hasComma = match[1].includes(",");
    const target = parseFloat(numStr);
    const isInt = !numStr.includes(".");
    const decimals = isInt ? 0 : (numStr.split(".")[1]?.length || 0);

    const duration = 1200;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
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
  }, [inView, value]);

  return <span ref={ref} className={className}>{display}</span>;
}
