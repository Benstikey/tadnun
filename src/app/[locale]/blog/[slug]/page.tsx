import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { CtaBand } from "@/components/cta-band";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateStaticParams() {
  return getAllBlogSlugs().map(({ slug, locale }) => ({ slug, locale }));
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

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <header>
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
              className="ms-3 text-[10px] font-mono uppercase tracking-wider text-accent hover:underline"
            >
              {post.sector}
            </a>
          )}
          <h1 className="mt-4 font-serif italic text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1]">
            {post.title}
          </h1>
          {post.description && (
            <p className="mt-5 text-muted text-lg leading-relaxed">
              {post.description}
            </p>
          )}
        </header>

        <div
          className="mt-12 prose prose-neutral max-w-none prose-headings:font-serif prose-headings:italic prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      <CtaBand
        titleKey="ctaBand.default.title"
        ctaKey="ctaBand.default.cta"
        descKey="ctaBand.default.desc"
        sectorKey={post.sector}
      />
    </PageShell>
  );
}
