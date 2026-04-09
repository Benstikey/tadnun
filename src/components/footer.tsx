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
            <span className="font-serif italic text-3xl" style={{ fontFamily: "var(--font-playfair), serif", fontStyle: "italic" }}>Tadnun</span>
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
                { href: `/${locale}/offre`, label: t("nav.offer") },
                { href: `/${locale}/case-studies`, label: t("caseStudies.navLabel") },
                { href: `/${locale}/blog`, label: t("nav.blog") },
                { href: `/${locale}/compare`, label: t("compare.navLabel") },
                { href: `/${locale}/resources`, label: t("resources.navLabel") },
                { href: `/${locale}/tools/quiz`, label: t("quiz.navLabel") },
                { href: `/${locale}/calculator`, label: t("calculator.nav") },
                { href: `/${locale}/contact`, label: t("nav.cta") },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-background/50 hover:text-background transition-colors"
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
            <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-2.5">
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
              <a href="tel:+212632431557" className="hover:text-background transition-colors">
                +212 632 431 557
              </a>
              <a href="https://wa.me/212632431557" className="hover:text-background transition-colors flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <a href="https://www.linkedin.com/company/tadnun/" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
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
