import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { CtaBand } from "@/components/cta-band";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map(({ slug, locale }) => ({ slug, locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return {};
  const pageUrl = `${BASE_URL}/${locale}/blog/${slug}`;
  return {
    title: `${post.title} — Tadnun`,
    description: post.description,
    alternates: { canonical: pageUrl },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post || post.locale !== locale) notFound();

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
          <a href={`/${locale}/blog`} className="hover:text-foreground transition-colors">
            {t("blog.eyebrow")}
          </a>
          {post.sector && (
            <>
              <span className="text-border">/</span>
              <a
                href={`/${locale}/sectors/${post.sector}`}
                className="text-accent hover:underline"
              >
                {t(`sectors.items.${post.sector}.name`)}
              </a>
            </>
          )}
        </nav>

        {/* Header */}
        <header>
          <div className="flex items-center gap-3 mb-5">
            <time className="text-[11px] font-mono text-muted tracking-wider">
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.sector && (
              <a
                href={`/${locale}/sectors/${post.sector}`}
                className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5 hover:bg-accent/10 transition-colors"
              >
                {t(`sectors.items.${post.sector}.name`)}
              </a>
            )}
          </div>
          <h1 className="font-serif italic text-3xl sm:text-4xl lg:text-[2.75rem] tracking-tight text-foreground leading-[1.1]">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 text-muted text-lg leading-relaxed max-w-2xl">
              {post.description}
            </p>
          )}
        </header>

        <div className="mt-10 border-t border-border" />

        {/* Body */}
        <div
          className="mt-10 prose prose-neutral max-w-none
            prose-headings:font-serif prose-headings:italic prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
            prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-[15px] prose-p:leading-relaxed prose-p:text-foreground/80
            prose-li:text-[15px] prose-li:text-foreground/80
            prose-strong:text-foreground prose-strong:font-semibold
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-accent/30 prose-blockquote:text-foreground/60 prose-blockquote:italic
            prose-ol:ps-5 prose-ul:ps-5"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back to blog */}
        <div className="mt-16 pt-8 border-t border-border">
          <a
            href={`/${locale}/blog`}
            className="group inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="rtl:scale-x-[-1] transition-transform group-hover:-translate-x-0.5">
              <path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {t("blog.backToBlog")}
          </a>
        </div>
      </article>

      <div className="section-divide" />

      <CtaBand
        titleKey="ctaBand.default.title"
        ctaKey="ctaBand.default.cta"
        descKey="ctaBand.default.desc"
        sectorKey={post.sector}
      />
    </PageShell>
  );
}
