import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

interface ResourceItem {
  key: string;
  href: string;
}

function getResourceItems(locale: string): ResourceItem[] {
  return [
    { key: "checklist", href: `/${locale}/blog/checklist-10-signes-perte-argent` },
    { key: "infographic", href: `/${locale}/blog/infographie-cout-vs-retour-digitalisation` },
    { key: "restaurantGuide", href: `/${locale}/blog/guide-digital-restaurant-maroc` },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  const pageUrl = `${BASE_URL}/${locale}/resources`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/resources`,
        en: `${BASE_URL}/en/resources`,
        ar: `${BASE_URL}/ar/resources`,
      },
    },
  };
}

export default async function ResourcesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });

  return (
    <PageShell>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-[4rem] leading-[1.06] tracking-tight text-foreground">
            {t("title")}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-xl">
            {t("subtitle")}
          </p>
        </ScrollReveal>
      </section>

      <div className="section-divide" />

      {/* ─── Resource grid ─── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getResourceItems(locale).map((item, i) => (
            <ScrollReveal key={item.key} delay={i * 60}>
              <a
                href={item.href}
                className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-md hover:-translate-y-0.5 h-full"
              >
                {/* Format badge */}
                <span className="self-start text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5">
                  {t(`items.${item.key}.format`)}
                </span>

                {/* Title */}
                <h2 className="font-serif italic text-foreground text-lg leading-snug tracking-tight group-hover:text-accent transition-colors">
                  {t(`items.${item.key}.title`)}
                </h2>

                {/* Description */}
                <p className="text-muted text-[14px] leading-relaxed line-clamp-3">
                  {t(`items.${item.key}.description`)}
                </p>

                {/* Download CTA */}
                <span className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent">
                  {t("download")}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-200 group-hover:translate-y-0.5"
                  >
                    <path
                      d="M8 3v8M4 8l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
