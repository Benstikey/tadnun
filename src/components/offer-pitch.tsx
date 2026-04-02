"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export function OfferPitch() {
  const t = useTranslations("offerPitch");
  const locale = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener("mousemove", handleMove);
    return () => { el.removeEventListener("mousemove", handleMove); io.disconnect(); };
  }, []);

  const lines = [
    { key: "line1", delay: "0.1s" },
    { key: "line2", delay: "0.2s" },
    { key: "line3", delay: "0.3s" },
  ] as const;

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div
        ref={containerRef}
        className="relative group rounded-3xl p-[1px] overflow-hidden"
      >
        {/* Animated gradient border */}
        <div
          className="absolute -inset-[1px] rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #C4482A, #e8956e, #C4482A, #8B2A15, #C4482A, #e8956e)",
            backgroundSize: "300% 300%",
            animation: "borderShift 6s ease infinite",
          }}
        />

        {/* Inner container */}
        <div className="relative rounded-[calc(1.5rem-1px)] overflow-hidden bg-[#0a0a0a]">
          {/* Spotlight glow following cursor */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: `radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(196,72,42,0.12), transparent 60%)`,
            }}
          />

          {/* Ambient glow orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-[100px] pointer-events-none" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative px-8 py-20 sm:px-16 sm:py-24 lg:px-24 lg:py-28 text-center">
            {/* Animated tag */}
            <div
              className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <span className="inline-flex items-center gap-2 text-[11px] font-mono tracking-[0.25em] uppercase text-accent/80 border border-accent/20 rounded-full px-4 py-1.5 bg-accent/[0.05]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                {t("tag")}
              </span>
            </div>

            {/* Headline — dramatic size */}
            <h2
              className={`mt-8 font-serif italic text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05] max-w-3xl mx-auto transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {t("title")}
            </h2>

            {/* Cost tickers with staggered entrance */}
            <div className={`mt-14 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {lines.map(({ key, delay }) => (
                <div
                  key={key}
                  className="group/card relative rounded-2xl border border-white/[0.06] bg-white/[0.03] px-7 py-5 min-w-[220px] hover:border-accent/20 hover:bg-accent/[0.04] transition-all duration-300"
                  style={{ transitionDelay: delay }}
                >
                  {/* Subtle inner glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse at center, rgba(196,72,42,0.06), transparent 70%)" }}
                  />
                  <p className="relative text-2xl sm:text-3xl font-serif italic text-white tracking-tight">
                    {t(key)}
                  </p>
                  <p className="relative text-[12px] text-white/30 mt-1.5 leading-relaxed">
                    {t(`${key}sub`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom line */}
            <p className={`mt-12 text-white/45 text-base sm:text-lg max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              {t("bottom")}
            </p>

            {/* CTA button with glow */}
            <div className={`mt-10 transition-all duration-700 delay-[400ms] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
              <a
                href={`/${locale}/offre`}
                className="group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-10 py-4 text-[15px] font-semibold text-white hover:shadow-[0_0_40px_rgba(196,72,42,0.4)] active:scale-[0.97] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-dark opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                <span className="relative">{t("cta")}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="relative rtl:-scale-x-100 transition-transform duration-200 group-hover/btn:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
