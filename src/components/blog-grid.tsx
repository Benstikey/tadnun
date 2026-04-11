"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Derive unique sectors from posts
  const sectors = Array.from(new Set(posts.map((p) => p.sector).filter(Boolean))) as string[];

  const filtered = active ? posts.filter((p) => p.sector === active) : posts;

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <>
      {/* Sector filter pills — horizontal scroll */}
      {sectors.length > 1 && (
        <div className="relative mb-10 group/pills">
          {/* Left arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer"
              aria-label="Scroll left"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide px-1 py-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <button
              onClick={() => setActive(null)}
              className={`text-[12px] px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
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
                className={`text-[12px] px-3.5 py-1.5 rounded-full border transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  active === s
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {sectorNames[s] || s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>

          {/* Right arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-background border border-border shadow-sm flex items-center justify-center text-muted hover:text-foreground hover:border-foreground/30 transition-all cursor-pointer"
              aria-label="Scroll right"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}

          {/* Fade edges */}
          {canScrollLeft && (
            <div className="absolute left-8 top-0 bottom-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-[5]" />
          )}
          {canScrollRight && (
            <div className="absolute right-8 top-0 bottom-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none z-[5]" />
          )}
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
