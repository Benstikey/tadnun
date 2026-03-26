"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const checkVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 50 && rect.bottom > -50) {
        setVisible(true);
        return true;
      }
      return false;
    };

    // Check immediately (element might already be in viewport)
    if (checkVisible()) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
          window.removeEventListener("scroll", onScroll);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 80px 0px" }
    );

    // Fallback: also listen for scroll (catches fast jumps the observer misses)
    const onScroll = () => {
      if (checkVisible()) {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
      }
    };

    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
