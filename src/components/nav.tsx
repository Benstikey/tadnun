"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { validSectors, type SectorKey } from "@/lib/sector-context";

export function Nav() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathSector = pathname.match(/\/sectors\/(\w+)/)?.[1] as SectorKey | undefined;
  const paramSector = searchParams.get("sector") as SectorKey | undefined;
  const activeSector = (pathSector && validSectors.includes(pathSector)) ? pathSector
    : (paramSector && validSectors.includes(paramSector)) ? paramSector
    : null;

  const sectorSuffix = activeSector ? `?sector=${activeSector}` : "";
  const sectorName = activeSector ? t(`sectors.items.${activeSector}.name`) : null;

  const navLinks = [
    { href: `/${locale}/#sectors`, label: t("nav.sectors") },
    { href: `/${locale}/approach${sectorSuffix}`, label: t("nav.approach") },
    { href: `/${locale}/about${sectorSuffix}`, label: t("nav.about") },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("nav.skipToContent")}
      </a>
      <nav
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-lg border-border/80"
            : "bg-transparent border-transparent"
        }`}
        aria-label={t("nav.ariaLabel")}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          {/* Logo + sector badge */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`/${locale}/`}
              className="font-serif italic text-[22px] tracking-tight text-foreground hover:text-accent transition-colors"
            >
              Tadnun
            </a>
            {activeSector && sectorName && (
              <a
                href={`/${locale}/sectors/${activeSector}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-medium px-2.5 py-1 rounded-full bg-accent/8 text-accent/80 border border-accent/15 hover:bg-accent/12 transition-colors"
              >
                {sectorName}
              </a>
            )}
          </div>

          {/* Desktop nav — centered links */}
          <div className="hidden md:flex items-center gap-1 absolute inset-x-0 justify-center pointer-events-none">
            <div className="flex items-center gap-1 pointer-events-auto">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-muted hover:text-foreground px-3.5 py-2.5 rounded-lg hover:bg-foreground/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: locale + CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <LocaleSwitcher />
            <a
              href={`/${locale}/contact${sectorSuffix}`}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background hover:bg-foreground/85 transition-all hover:-translate-y-px"
            >
              <span>{t("common.letsTalk")}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 rtl:-scale-x-100">
                <path d="M2 7h10m0 0L8.5 3.5M12 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-foreground/5 -me-1.5 text-foreground transition-colors"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              {mobileOpen ? (
                <>
                  <line x1="5" y1="5" x2="15" y2="15" />
                  <line x1="5" y1="15" x2="15" y2="5" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="7" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-border bg-background px-6 pb-6 pt-4">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 text-[16px] text-foreground/70 hover:text-foreground transition-colors border-b border-border/50 last:border-0"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
              <LocaleSwitcher />
              <a
                href={`/${locale}/contact${sectorSuffix}`}
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/85 transition-all"
              >
                {t("common.letsTalk")}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 rtl:-scale-x-100">
                  <path d="M2 7h10m0 0L8.5 3.5M12 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
