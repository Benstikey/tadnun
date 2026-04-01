import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageShell } from "@/components/page-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BlogIllustration } from "@/components/blog-illustration";
import { BlogGrid } from "@/components/blog-grid";
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
  const t = await getTranslations({ locale });
  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const posts = await getBlogPosts(locale);

  const sectorKeys = [
    "agriculture", "restaurants", "tourism", "healthcare",
    "retail", "education", "realestate", "logistics",
  ];
  const sectorNames: Record<string, string> = {
    business: locale === "fr" ? "Business" : locale === "ar" ? "أعمال" : "Business",
  };
  for (const key of sectorKeys) {
    sectorNames[key] = t(`sectors.items.${key}.name`);
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <PageShell>
      {/* ─── Hero ─── */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20">
        <ScrollReveal>
          <p className="text-accent text-[11px] font-mono tracking-[0.2em] uppercase mb-5">
            {tBlog("eyebrow")}
          </p>
          <h1 className="font-serif italic text-4xl sm:text-5xl lg:text-[4rem] leading-[1.1] tracking-tight text-foreground">
            {tBlog("title")}
          </h1>
          <p className="mt-6 text-muted text-lg leading-relaxed max-w-xl">
            {tBlog("subtitle")}
          </p>
        </ScrollReveal>
      </section>

      <div className="section-divide" />

      <section className="mx-auto max-w-6xl px-6 py-20">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-border bg-surface/50 p-12 text-center">
            <p className="text-muted text-base">{tBlog("empty")}</p>
          </div>
        ) : (
          <>
            {/* ─── Featured article ─── */}
            {featured && (
              <>
              <ScrollReveal>
                <h2 className="font-serif italic text-2xl sm:text-3xl tracking-tight text-foreground leading-[1.1]">
                  {tBlog("featuredTitle")}
                </h2>
                <p className="mt-3 text-muted text-[15px] leading-relaxed max-w-lg">
                  {tBlog("featuredDesc")}
                </p>
              </ScrollReveal>
              <ScrollReveal className="mt-6">
                <a
                  href={`/${locale}/blog/${featured.slug}`}
                  className="group grid lg:grid-cols-2 gap-8 rounded-2xl border border-border bg-surface p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-foreground/15 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <div className="flex flex-col justify-center gap-4">
                    <div className="flex items-center gap-3">
                      <time className="text-[11px] font-mono text-muted tracking-wider">
                        {new Date(featured.date).toLocaleDateString(locale, {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {featured.sector && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5">
                          {t(`sectors.items.${featured.sector}.name`)}
                        </span>
                      )}
                    </div>
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
                  <div className="hidden lg:flex items-center justify-center rounded-xl bg-foreground/[0.02] border border-border/40 p-6">
                    <BlogIllustration sector={featured.sector} />
                  </div>
                </a>
              </ScrollReveal>
              </>
            )}

            {/* ─── Filterable article grid ─── */}
            {rest.length > 0 && (
              <div className="mt-10">
                <BlogGrid
                  locale={locale}
                  posts={rest}
                  sectorNames={sectorNames}
                  labels={{
                    all: locale === "fr" ? "Tous" : locale === "ar" ? "الكل" : "All",
                    learnMore: t("common.learnMore"),
                  }}
                />
              </div>
            )}
          </>
        )}
      </section>
    </PageShell>
  );
}
