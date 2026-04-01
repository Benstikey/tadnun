"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { trackEvent } from "@/lib/analytics";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const pathSector = pathname.match(/\/sectors\/(\w+)/)?.[1] as SectorKey | undefined;
  const paramSector = searchParams.get("sector") as SectorKey | undefined;
  const activeSector = (pathSector && validSectors.includes(pathSector)) ? pathSector
    : (paramSector && validSectors.includes(paramSector)) ? paramSector
    : null;

  const sectorSuffix = activeSector ? `?sector=${activeSector}` : "";
  const sectorName = activeSector ? t(`sectors.items.${activeSector}.name`) : null;

  const [toolsOpen, setToolsOpen] = useState(false);

  const navLinks: { href: string; label: string; accent?: boolean }[] = [
    { href: `/${locale}/sectors`, label: t("nav.sectors") },
    { href: `/${locale}/approach${sectorSuffix}`, label: t("nav.approach") },
    { href: `/${locale}/about${sectorSuffix}`, label: t("nav.about") },
    { href: `/${locale}/blog`, label: t("nav.blog") },
  ];

  const toolsItems = [
    { href: `/${locale}/tools/quiz`, label: t("quiz.start") },
    { href: `/${locale}/calculator`, label: t("calculator.nav") },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        {t("nav.skipToContent")}
      </a>
      <nav
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled || mobileOpen
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
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <span className="font-serif italic text-[22px] tracking-tight text-foreground" style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic" }}>
                Tadnun
              </span>
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
                  onClick={() => trackEvent("nav_link_clicked", { label: link.label, href: link.href })}
                  className="nav-link-underline text-[13px] px-3.5 py-2.5 rounded-lg transition-all text-muted hover:text-foreground hover:bg-foreground/[0.04]"
                >
                  {link.label}
                </a>
              ))}

              {/* Tools dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setToolsOpen(true)}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <button
                  type="button"
                  className="nav-link-underline text-[13px] px-3.5 py-2.5 rounded-lg transition-all text-muted hover:text-foreground hover:bg-foreground/[0.04] inline-flex items-center gap-1"
                >
                  {t("nav.tools")}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${toolsOpen ? "rotate-180" : ""}`}>
                    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {toolsOpen && (
                  <div className="absolute top-full start-0 pt-1 z-50">
                    <div className="rounded-xl border border-border bg-background shadow-lg py-1.5 min-w-[180px]">
                      {toolsItems.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => { setToolsOpen(false); trackEvent("nav_link_clicked", { label: item.label, href: item.href }); }}
                          className="block px-4 py-2.5 text-[13px] text-muted hover:text-foreground hover:bg-foreground/[0.04] transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Offer — accent */}
              <a
                href={`/${locale}/offre`}
                onClick={() => trackEvent("nav_link_clicked", { label: t("nav.offer"), href: `/${locale}/offre` })}
                className="nav-link-underline text-[13px] px-3.5 py-2.5 rounded-lg transition-all text-accent font-medium hover:bg-accent/[0.06]"
              >
                {t("nav.offer")}
              </a>
            </div>
          </div>

          {/* Right: locale + CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <LocaleSwitcher />
            <a
              href={`/${locale}/contact${sectorSuffix}`}
              onClick={() => trackEvent("cta_clicked", { location: "nav", label: t("common.letsTalk") })}
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-[13px] font-semibold text-background hover:bg-foreground/85 active:scale-[0.97] transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-foreground/10"
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
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-foreground/5 -me-1.5 text-foreground transition-colors"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
              <line
                x1={mobileOpen ? 5 : 3} y1={mobileOpen ? 5 : 6}
                x2={mobileOpen ? 15 : 17} y2={mobileOpen ? 15 : 6}
                className="transition-all duration-300 ease-out"
                style={{ transformOrigin: "center" }}
              />
              <line
                x1="3" y1="10" x2="17" y2="10"
                className="transition-all duration-200"
                style={{ opacity: mobileOpen ? 0 : 1 }}
              />
              <line
                x1={mobileOpen ? 5 : 7} y1={mobileOpen ? 15 : 14}
                x2={mobileOpen ? 15 : 17} y2={mobileOpen ? 5 : 14}
                className="transition-all duration-300 ease-out"
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile nav — overlay */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-foreground/20 transition-opacity duration-300 ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-[calc(57px+1px)] inset-x-0 bg-background border-b border-border shadow-xl transition-all duration-300 ease-out ${
            mobileOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-2"
          }`}
        >
          <div className="px-6 pb-6 pt-4 max-h-[calc(100dvh-58px)] overflow-y-auto">
            <div className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 text-[16px] transition-colors border-b border-border/50 text-foreground/70 hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              {/* Tools group */}
              <p className="pt-4 pb-1 text-[11px] font-mono uppercase tracking-[0.15em] text-muted/50">{t("nav.tools")}</p>
              {toolsItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3.5 text-[16px] transition-colors border-b border-border/50 text-foreground/70 hover:text-foreground ps-3"
                >
                  {item.label}
                </a>
              ))}
              {/* Offer — accent */}
              <a
                href={`/${locale}/offre`}
                onClick={() => setMobileOpen(false)}
                className="py-3.5 text-[16px] transition-colors text-accent font-medium"
              >
                {t("nav.offer")}
              </a>
            </div>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-border/50">
              <LocaleSwitcher dropUp />
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
      </div>
    </>
  );
}
