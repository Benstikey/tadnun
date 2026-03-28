import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface BlogPost {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  sector?: string;
  image?: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  locale: string;
  title: string;
  description: string;
  date: string;
  sector?: string;
  image?: string;
}

/**
 * Get all blog post metadata for a given locale, sorted by date (newest first).
 */
export function getBlogPosts(locale: string): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts: BlogPostMeta[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data } = matter(raw);

    if (data.locale !== locale) continue;

    posts.push({
      slug: file.replace(/\.md$/, ""),
      locale: data.locale,
      title: data.title,
      description: data.description || "",
      date: data.date,
      sector: data.sector,
      image: data.image,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug, with rendered HTML content.
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(raw);

  const result = await remark().use(remarkGfm).use(html).process(markdown);

  return {
    slug,
    locale: data.locale,
    title: data.title,
    description: data.description || "",
    date: data.date,
    sector: data.sector,
    image: data.image,
    content: result.toString(),
  };
}

/**
 * Get all slugs for static generation.
 */
export function getAllBlogSlugs(): { slug: string; locale: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), locale: data.locale };
    });
}
