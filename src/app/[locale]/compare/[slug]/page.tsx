import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { CtaBand } from "@/components/cta-band";
import { getComparePage, getAllCompareSlugs } from "@/lib/compare";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateStaticParams() {
  return getAllCompareSlugs().map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const page = await getComparePage(slug);
  if (!page) return {};
  const pageUrl = `${BASE_URL}/${locale}/compare/${slug}`;
  return {
    title: `${page.title} — Tadnun`,
    description: page.description,
    alternates: { canonical: pageUrl },
  };
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const page = await getComparePage(slug);
  if (!page || page.locale !== locale) notFound();

  const t = await getTranslations({ locale });

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-muted mb-10">
          <a href={`/${locale}`} className="hover:text-foreground transition-colors">
            {t("common.home")}
          </a>
          <span className="text-border">/</span>
          <a href={`/${locale}/compare`} className="hover:text-foreground transition-colors">
            {t("compare.eyebrow")}
          </a>
        </nav>

        {/* Header */}
        <header>
          <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5">
            {page.type === "vs" ? `Tadnun vs ${page.competitor}` : page.type === "alternative" ? `${t("compare.altLabel")} ${page.competitor}` : page.competitor}
          </span>
          <h1 className="mt-4 font-serif italic text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-foreground leading-[1.1]">
            {page.title}
          </h1>
          {page.description && (
            <p className="mt-5 text-muted text-lg leading-relaxed max-w-2xl">
              {page.description}
            </p>
          )}
        </header>

        <div className="mt-10 border-t border-border" />

        {/* Body */}
        <div
          className="mt-10 prose prose-neutral max-w-none overflow-x-auto
            prose-headings:font-serif prose-headings:italic prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-foreground/80
            prose-li:text-[15px] prose-li:text-foreground/80
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-accent/30 prose-blockquote:text-foreground/60 prose-blockquote:italic"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-border">
          <a
            href={`/${locale}/compare`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:scale-x-[-1] transition-transform group-hover:-translate-x-0.5">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t("compare.backToCompare")}
          </a>
        </div>
      </article>

      <div className="section-divide" />

      <CtaBand
        titleKey="ctaBand.default.title"
        ctaKey="ctaBand.default.cta"
        descKey="ctaBand.default.desc"
      />
    </PageShell>
  );
}
