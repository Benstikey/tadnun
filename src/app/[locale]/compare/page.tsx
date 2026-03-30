import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getComparePages } from "@/lib/compare";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "compare" });
  const pageUrl = `${BASE_URL}/${locale}/compare`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/compare`,
        en: `${BASE_URL}/en/compare`,
        ar: `${BASE_URL}/ar/compare`,
      },
    },
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const tCompare = await getTranslations({ locale, namespace: "compare" });
  const pages = getComparePages(locale);

  const featured = pages[0];
  const rest = pages.slice(1);

  function typeLabel(type: string) {
    return type === "vs" ? "VS" : type === "alternative" ? tCompare("altLabel") : tCompare("categoryLabel");
  }

  return (
    <PageShell>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
            {tCompare("eyebrow")}
          </p>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight text-foreground">
            {tCompare("title")}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-xl">
            {tCompare("subtitle")}
          </p>
        </ScrollReveal>
      </section>

      <div className="section-divide" />

      <section className="mx-auto max-w-6xl px-6 py-20">
        {pages.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface/50 p-12 text-center">
            <p className="text-muted text-base">{tCompare("empty")}</p>
          </div>
        ) : (
          <>
            {/* ─── Featured comparison ─── */}
            {featured && (
              <ScrollReveal>
                <a
                  href={`/${locale}/compare/${featured.slug}`}
                  className="group grid lg:grid-cols-2 gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-foreground/15 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex flex-col justify-center gap-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5 self-start">
                      {typeLabel(featured.type)}
                    </span>
                    <h3 className="font-serif italic text-xl sm:text-2xl tracking-tight text-foreground leading-[1.1] group-hover:text-accent transition-colors">
                      {featured.title}
                    </h3>
                    <p className="text-muted text-[15px] leading-relaxed">
                      {featured.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent mt-2">
                      {t("common.learnMore")}
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-1">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                  <div className="hidden lg:flex items-center justify-center rounded-xl bg-foreground/[0.03] border border-border/50 p-8">
                    <span className="text-5xl font-serif italic text-foreground/10">Tadnun vs</span>
                  </div>
                </a>
              </ScrollReveal>
            )}

            {/* ─── Grid ─── */}
            {rest.length > 0 && (
              <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((page, i) => (
                  <ScrollReveal key={page.slug} delay={i * 60}>
                    <a
                      href={`/${locale}/compare/${page.slug}`}
                      className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-md hover:-translate-y-0.5 h-full"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5 self-start">
                        {typeLabel(page.type)}
                      </span>
                      <h3 className="font-serif italic text-foreground text-base leading-snug tracking-tight group-hover:text-accent transition-colors">
                        {page.title}
                      </h3>
                      <p className="text-muted text-[14px] leading-relaxed line-clamp-3">
                        {page.description}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                        {t("common.learnMore")}
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-0.5">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </a>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </PageShell>
  );
}
