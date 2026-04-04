"use client";

import { useRef, useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";

function Counter({ target, active, dur = 2200 }: { target: number; active: boolean; dur?: number }) {
  const [v, setV] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!active) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setV(Math.floor((1 - Math.pow(1 - p, 4)) * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, dur]);
  return <>{v.toLocaleString("fr-FR")}</>;
}

function Ticker({ items, speed = 30, reverse = false, variant = "red" }: { items: string[]; speed?: number; reverse?: boolean; variant?: "red" | "green" }) {
  const duped = [...items, ...items, ...items, ...items];
  const color = variant === "red" ? "text-red-300/80" : "text-emerald-400/80";
  const dot = variant === "red" ? "bg-red-300/40" : "bg-emerald-400/40";
  return (
    <div className="overflow-hidden whitespace-nowrap select-none" aria-hidden="true">
      <div className={reverse ? "animate-ticker-reverse" : "animate-ticker"} style={{ animationDuration: `${speed}s` }}>
        {duped.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-4">
            <span className={`text-sm font-mono ${color}`}>{item}</span>
            <span className={`w-1 h-1 rounded-full ${dot}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

export function OfferPitch() {
  const t = useTranslations("offerPitch");
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); io.disconnect(); }
    }, { threshold: 0.1 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lossTicker = [
    `−120,000 MAD ${t("line1sub")}`,
    `−330,000 MAD ${t("line2sub")}`,
    `−40,000 MAD ${t("line3sub")}`,
  ];
  const winTicker = [
    `${t("win1")} ${t("win1sub")}`,
    `${t("win2")} ${t("win2sub")}`,
    `${t("win3")} ${t("win3sub")}`,
  ];

  return (
    <section ref={ref} className="relative bg-foreground text-background overflow-hidden grain">
      {/* Ambient glows */}
      <div className="absolute top-0 end-0 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", transform: "translate(20%, -30%)" }} />
      <div className="absolute bottom-0 start-0 w-[500px] h-[500px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(239,68,68,0.05) 0%, transparent 70%)", transform: "translate(-20%, 30%)" }} />

      {/* Top ticker — wins */}
      <div className={`border-b border-background/6 py-3 transition-opacity duration-1000 ${vis ? "opacity-100" : "opacity-0"}`}>
        <Ticker items={winTicker} speed={28} variant="green" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-20 sm:py-28 lg:py-36">
        {/* Side by side comparison */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">

          {/* LEFT — With Tadnun (joyful) */}
          <div className={`relative text-center md:text-start transition-all duration-700 delay-100 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {/* Warm glow behind the Tadnun side */}
            <div className="absolute -inset-8 rounded-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(16,185,129,0.08) 0%, transparent 60%)" }} />

            <div className="relative">
              <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-emerald-400 bg-emerald-400/[0.1] border border-emerald-400/20 rounded-full px-4 py-1.5">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="8" fill="currentColor" fillOpacity="0.25" />
                  <path d="M5 8.5l2 2L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t("withTadnun")}
              </span>
              <p className={`mt-6 font-serif italic text-5xl sm:text-6xl lg:text-[7rem] leading-none tracking-tight text-emerald-400 tabular-nums transition-all duration-700 delay-300 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
                +<Counter target={490000} active={vis} dur={2800} />
              </p>
              <p className="mt-3 text-[12px] font-mono tracking-widest text-emerald-400/60 uppercase">
                MAD / {locale === "fr" ? "an récupérés" : locale === "ar" ? "سنة مسترجعين" : "year recovered"}
              </p>

              {/* Win stats — proof points */}
              <div className={`mt-8 flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3 transition-all duration-600 delay-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                {(["win1", "win2", "win3"] as const).map((key) => (
                  <div key={key} className="flex items-center gap-2 rounded-lg bg-emerald-400/[0.06] border border-emerald-400/10 px-3 py-2">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="shrink-0 text-emerald-400">
                      <path d="M3 8l4 4L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[12px] text-emerald-300 font-medium whitespace-nowrap">{t(key)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Without Tadnun (faded, defeated) */}
          <div className={`text-center md:text-end opacity-75 transition-all duration-700 delay-300 ${vis ? "translate-y-0" : "translate-y-6"}`}>
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-red-300/50 border border-red-400/15 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400/40" />
              {locale === "fr" ? "Sans Tadnun" : locale === "ar" ? "بلا تدنون" : "Without Tadnun"}
            </span>
            <p className={`mt-6 font-serif italic text-5xl sm:text-6xl lg:text-[7rem] leading-none tracking-tight text-red-400/50 tabular-nums line-through decoration-red-400/25 decoration-2 transition-all duration-700 delay-500 ${vis ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
              −<Counter target={490000} active={vis} dur={3200} />
            </p>
            <p className="mt-3 text-[12px] font-mono tracking-widest text-red-400/30 uppercase">
              MAD / {locale === "fr" ? "an perdus" : locale === "ar" ? "سنة ضايعين" : "year lost"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={`mt-16 flex items-center gap-4 transition-all duration-600 delay-500 ${vis ? "opacity-100" : "opacity-0"}`}>
          <div className="h-px flex-1 bg-background/10" />
          <span className="text-[11px] font-mono tracking-widest text-background/30 uppercase">{t("tag")}</span>
          <div className="h-px flex-1 bg-background/10" />
        </div>

        {/* Bottom — headline + CTA */}
        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
          <h2 className="font-serif italic text-2xl sm:text-3xl lg:text-4xl tracking-tight text-background leading-[1.1] max-w-2xl mx-auto">
            {t("title")}
          </h2>
          <p className="mt-5 text-background/50 text-base leading-relaxed max-w-md mx-auto">
            {t("bottom")}
          </p>
          <div className="mt-8">
            <a
              href={`/${locale}/offre`}
              className="group inline-flex items-center gap-3 rounded-full bg-accent text-white px-10 py-4 text-[15px] font-semibold shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 active:scale-[0.97] transition-all duration-200 hover:-translate-y-0.5"
            >
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-1">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom ticker — losses */}
      <div className={`border-t border-background/6 py-3 transition-opacity duration-1000 delay-500 ${vis ? "opacity-100" : "opacity-0"}`}>
        <Ticker items={lossTicker} speed={35} reverse variant="red" />
      </div>
    </section>
  );
}
