"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { trackEvent } from "@/lib/analytics";

function FlagFR() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-[2px] shrink-0">
      <rect width="7" height="14" fill="#002395" />
      <rect x="7" width="6" height="14" fill="#fff" />
      <rect x="13" width="7" height="14" fill="#ED2939" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg width="20" height="14" viewBox="0 0 60 42" className="rounded-[2px] shrink-0">
      <rect width="60" height="42" fill="#012169" />
      <path d="M0 0L60 42M60 0L0 42" stroke="#fff" strokeWidth="7" />
      <path d="M0 0L60 42M60 0L0 42" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0V42M0 21H60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0V42M0 21H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

function FlagMA() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" className="rounded-[2px] shrink-0">
      <rect width="20" height="14" fill="#C1272D" />
      <polygon points="10,3 11.18,6.63 15,6.63 11.91,8.87 13.09,12.5 10,10.26 6.91,12.5 8.09,8.87 5,6.63 8.82,6.63" fill="none" stroke="#006233" strokeWidth="0.7" />
    </svg>
  );
}

const locales = [
  { code: "fr", label: "Français", Flag: FlagFR, short: "FR" },
  { code: "en", label: "English", Flag: FlagGB, short: "EN" },
  { code: "ar", label: "العربية", Flag: FlagMA, short: "AR" },
] as const;

export function LocaleSwitcher({ dropUp = false }: { dropUp?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find((l) => l.code === locale) || locales[0];

  // Close on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchTo = (code: string) => {
    trackEvent("locale_switched", { from: locale, to: code });
    // Blog/compare article slugs are language-specific — redirect to listing page
    const blogMatch = pathname.match(/^\/blog\/.+/);
    const compareMatch = pathname.match(/^\/compare\/.+/);
    const target = blogMatch ? "/blog" : compareMatch ? "/compare" : pathname;
    router.replace(target, { locale: code });
    setOpen(false);
  };

  const dropdownPosition = dropUp
    ? "bottom-full mb-2 origin-bottom-start rtl:origin-bottom-end"
    : "top-full mt-2 origin-top-end rtl:origin-top-start";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-[13px] text-muted hover:text-foreground transition-colors py-2 px-3 rounded-full hover:bg-foreground/5 cursor-pointer"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={
          locale === "fr"
            ? "Changer de langue"
            : locale === "ar"
              ? "تغيير اللغة"
              : "Change language"
        }
      >
        <current.Flag />
        <span className="font-medium">{current.short}</span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={`text-muted transition-transform duration-200 ${open ? (dropUp ? "" : "rotate-180") : (dropUp ? "rotate-180" : "")}`}
        >
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown */}
      <div
        className={`absolute ${dropUp ? "start-0" : "end-0"} ${dropdownPosition} w-44 rounded-xl border border-border bg-surface shadow-lg shadow-foreground/5 overflow-hidden transition-all duration-200 ${
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="listbox"
        aria-label="Languages"
      >
        {locales.map((l) => {
          const isActive = l.code === locale;
          return (
            <button
              key={l.code}
              role="option"
              aria-selected={isActive}
              onClick={() => switchTo(l.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-[13px] transition-colors cursor-pointer ${
                isActive
                  ? "bg-accent/5 text-accent font-medium"
                  : "text-foreground/70 hover:bg-foreground/[0.03] hover:text-foreground"
              }`}
            >
              <l.Flag />
              <span className="flex-1">{l.label}</span>
              {isActive && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent">
                  <path d="M3 7.5l2.5 2.5L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
