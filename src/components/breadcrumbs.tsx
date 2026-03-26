import { useLocale, useTranslations } from "next-intl";

export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const locale = useLocale();
  const t = useTranslations("common");

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex items-center gap-2 text-sm text-muted">
        <li>
          <a href={`/${locale}/`} className="hover:text-foreground transition-colors">
            {t("home")}
          </a>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-border">/</span>
            {item.href ? (
              <a href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </a>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
