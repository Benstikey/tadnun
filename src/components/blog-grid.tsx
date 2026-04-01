"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { BlogIllustration } from "@/components/blog-illustration";
import type { BlogPostMeta } from "@/lib/blog";

interface Props {
  locale: string;
  posts: BlogPostMeta[];
  sectorNames: Record<string, string>;
  labels: { all: string; learnMore: string };
}

export function BlogGrid({ locale, posts, sectorNames, labels }: Props) {
  const [active, setActive] = useState<string | null>(null);

  // Derive unique sectors from posts
  const sectors = Array.from(new Set(posts.map((p) => p.sector).filter(Boolean))) as string[];

  const filtered = active ? posts.filter((p) => p.sector === active) : posts;

  return (
    <>
      {/* Sector filter pills */}
      {sectors.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={() => setActive(null)}
            className={`text-[12px] px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
              active === null
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            {labels.all}
          </button>
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setActive(active === s ? null : s)}
              className={`text-[12px] px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                active === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {sectorNames[s] || s}
            </button>
          ))}
        </div>
      )}

      {/* Article grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <ScrollReveal key={post.slug} delay={i * 60}>
            <a
              href={`/${locale}/blog/${post.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-md hover:-translate-y-0.5 h-full"
            >
              <div className="h-24 -mx-1 -mt-1 mb-1 rounded-lg bg-foreground/[0.015] flex items-center justify-center overflow-hidden">
                <BlogIllustration sector={post.sector} className="w-full h-full text-foreground" />
              </div>
              <div className="flex items-center gap-3">
                <time className="text-[11px] font-mono text-muted tracking-wider">
                  {new Date(post.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.sector && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-accent bg-accent/[0.06] rounded-full px-2.5 py-0.5">
                    {sectorNames[post.sector] || post.sector}
                  </span>
                )}
              </div>
              <h3 className="font-serif italic text-foreground text-base leading-snug tracking-tight group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-muted text-[14px] leading-relaxed line-clamp-3">
                {post.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 text-[12px] font-semibold text-accent">
                {labels.learnMore}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="rtl:-scale-x-100 transition-transform duration-200 group-hover:translate-x-0.5">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
