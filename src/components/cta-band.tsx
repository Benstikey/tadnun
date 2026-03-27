import { useTranslations, useLocale } from "next-intl";

export function CtaBand({
  titleKey = "ctaBand.default.title",
  ctaKey = "ctaBand.default.cta",
  descKey,
  sectorKey,
}: {
  titleKey?: string;
  ctaKey?: string;
  descKey?: string;
  sectorKey?: string | null;
}) {
  const t = useTranslations();
  const locale = useLocale();

  const contactHref = sectorKey
    ? `/${locale}/contact?sector=${sectorKey}`
    : `/${locale}/contact`;

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="font-serif italic text-3xl sm:text-4xl tracking-tight text-foreground max-w-2xl">
        {t(titleKey)}
      </h2>
      {descKey && (
        <p className="mt-4 text-muted max-w-md text-base leading-relaxed">
          {t(descKey)}
        </p>
      )}
      <div className="mt-8 flex items-center gap-4">
        <a
          href={contactHref}
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm shadow-accent/20 hover:shadow-lg hover:shadow-accent/25 hover:bg-accent/90 active:scale-[0.97] active:shadow-sm transition-all duration-150 hover:-translate-y-px"
        >
          {t(ctaKey)}
        </a>
      </div>
    </section>
  );
}
