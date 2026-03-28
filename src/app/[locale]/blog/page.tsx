import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getBlogPosts } from "@/lib/blog";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://tadnun.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const pageUrl = `${BASE_URL}/${locale}/blog`;
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: {
      canonical: pageUrl,
      languages: {
        fr: `${BASE_URL}/fr/blog`,
        en: `${BASE_URL}/en/blog`,
        ar: `${BASE_URL}/ar/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getBlogPosts(locale);

  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-16">
        <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-4">
          {t("eyebrow")}
        </p>
        <h1 className="font-serif italic text-4xl sm:text-5xl tracking-tight text-foreground leading-[1.1]">
          {t("title")}
        </h1>
        <p className="mt-5 text-muted text-lg leading-relaxed max-w-xl">
          {t("subtitle")}
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface/50 p-12 text-center">
            <p className="text-muted text-base">{t("empty")}</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <ScrollReveal key={post.slug} delay={i * 60}>
                <a
                  href={`/${locale}/blog/${post.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-lg hover:-translate-y-0.5 h-full"
                >
                  <div>
                    <time className="text-[11px] font-mono text-muted tracking-wider">
                      {new Date(post.date).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {post.sector && (
                      <span className="ms-3 text-[10px] font-mono uppercase tracking-wider text-accent">
                        {post.sector}
                      </span>
                    )}
                  </div>
                  <h2 className="font-semibold text-foreground text-lg leading-snug group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted text-[14px] leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </a>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
