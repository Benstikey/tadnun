import { useTranslations, useLocale } from "next-intl";

const sectorKeys = [
  "agriculture", "restaurants", "tourism", "healthcare",
  "retail", "education", "realestate", "logistics",
] as const;

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <footer className="bg-foreground text-background">
      {/* Top accent line */}
      <div className="h-px bg-accent/40" />

      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        {/* Upper: brand + CTA */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 pb-12 border-b border-background/10">
          <div>
            <span className="font-serif italic text-3xl">Tadnun</span>
            <p className="mt-2 text-background/50 text-sm leading-relaxed max-w-[280px]">
              {t("footer.tagline")}
            </p>
          </div>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-semibold hover:bg-background/90 active:scale-[0.97] transition-all duration-150 hover:-translate-y-px hover:shadow-lg hover:shadow-background/10 self-start sm:self-auto"
          >
            {t("common.letsTalk")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 rtl:-scale-x-100">
              <path d="M2 7h10m0 0L8.5 3.5M12 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

        {/* Links grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pt-10">
          {/* Navigation */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-background/30 mb-4">
              {t("footer.navTitle")}
            </p>
            <div className="flex flex-col gap-2.5">
              {[
                { href: `/${locale}/`, label: t("common.home") },
                { href: `/${locale}/approach`, label: t("nav.approach") },
                { href: `/${locale}/about`, label: t("nav.about") },
                { href: `/${locale}/contact`, label: t("nav.cta") },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link-underline text-sm text-background/50 hover:text-background transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Sectors — two columns */}
          <div className="sm:col-span-2 lg:col-span-2">
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-background/30 mb-4">
              {t("footer.sectorsTitle")}
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5">
              {sectorKeys.map((key) => (
                <a
                  key={key}
                  href={`/${locale}/sectors/${key}`}
                  className="text-sm text-background/50 hover:text-background transition-colors"
                >
                  {t(`sectors.items.${key}.name`)}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-background/30 mb-4">
              {t("footer.contactTitle")}
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-background/50">
              <a href="mailto:contact@tadnun.ma" className="hover:text-background transition-colors">
                contact@tadnun.ma
              </a>
              <a href="https://wa.me/212600000000" className="hover:text-background transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-background/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[12px] text-background/30">
          <span>&copy; {new Date().getFullYear()} {t("footer.copy")}</span>
          <span>{t("footer.made")}</span>
        </div>
      </div>
    </footer>
  );
}
