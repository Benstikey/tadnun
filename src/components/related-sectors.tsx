import { useTranslations, useLocale } from "next-intl";
import { SectorIcon } from "./icons";
import { relatedSectors } from "@/data/related-sectors";

export function RelatedSectors({ currentSector }: { currentSector: string }) {
  const t = useTranslations();
  const locale = useLocale();
  const related = relatedSectors[currentSector] || [];

  if (related.length === 0) return null;

  return (
    <section className="mx-auto max-w-5xl px-6 py-24">
      <h2 className="font-serif italic text-3xl tracking-tight text-foreground mb-10">
        {locale === "fr" ? "Autres secteurs" : "Other sectors"}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">
        {related.map((key) => (
          <a
            key={key}
            href={`/${locale}/sectors/${key}`}
            className="group rounded-2xl border border-border bg-surface p-6 flex items-start gap-4 transition-all hover:shadow-lg hover:border-foreground/10 hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-lg bg-foreground/5 flex items-center justify-center text-foreground/50 shrink-0">
              <SectorIcon sectorKey={key} size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-[15px]">
                {t(`sectors.items.${key}.name`)}
              </h3>
              <p className="mt-1 text-muted text-[13px] line-clamp-2">
                {t(`sectors.items.${key}.tagline`)}
              </p>
            </div>
            <span className="ml-auto text-muted group-hover:text-accent transition-colors shrink-0">
              &rarr;
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
