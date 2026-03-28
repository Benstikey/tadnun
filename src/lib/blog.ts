import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import html from "remark-html";
import { createClient } from "@supabase/supabase-js";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

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

async function renderMarkdown(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(html).process(markdown);
  return result.toString();
}

// ── File-based posts ──

function getFilePosts(locale: string): BlogPostMeta[] {
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

  return posts;
}

async function getFilePost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(raw);

  return {
    slug,
    locale: data.locale,
    title: data.title,
    description: data.description || "",
    date: data.date,
    sector: data.sector,
    image: data.image,
    content: await renderMarkdown(markdown),
  };
}

function getAllFileSlugs(): { slug: string; locale: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs.readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), locale: data.locale };
    });
}

// ── Supabase posts ──

async function getDbPosts(locale: string): Promise<BlogPostMeta[]> {
  if (!supabase) return [];

  const { data } = await supabase
    .from("blog_posts")
    .select("slug, locale, title, description, sector, published_at, status")
    .eq("locale", locale)
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (!data) return [];

  return data.map((p) => ({
    slug: p.slug,
    locale: p.locale,
    title: p.title,
    description: p.description || "",
    date: p.published_at || "",
    sector: p.sector || undefined,
  }));
}

async function getDbPost(slug: string): Promise<BlogPost | null> {
  if (!supabase) return null;

  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!data) return null;

  return {
    slug: data.slug,
    locale: data.locale,
    title: data.title,
    description: data.description || "",
    date: data.published_at || data.created_at,
    sector: data.sector || undefined,
    content: await renderMarkdown(data.content),
  };
}

async function getAllDbSlugs(): Promise<{ slug: string; locale: string }[]> {
  if (!supabase) return [];

  const { data } = await supabase
    .from("blog_posts")
    .select("slug, locale")
    .eq("status", "published");

  return (data || []).map((p) => ({ slug: p.slug, locale: p.locale }));
}

// ── Hybrid (merge file + db) ──

export async function getBlogPosts(locale: string): Promise<BlogPostMeta[]> {
  const filePosts = getFilePosts(locale);
  const dbPosts = await getDbPosts(locale);

  // Merge, dedupe by slug (db wins if same slug exists)
  const slugMap = new Map<string, BlogPostMeta>();
  for (const p of filePosts) slugMap.set(p.slug, p);
  for (const p of dbPosts) slugMap.set(p.slug, p);

  return Array.from(slugMap.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Try DB first (admin-managed posts take priority)
  const dbPost = await getDbPost(slug);
  if (dbPost) return dbPost;

  // Fall back to file
  return getFilePost(slug);
}

export async function getAllBlogSlugs(): Promise<{ slug: string; locale: string }[]> {
  const fileSlugs = getAllFileSlugs();
  const dbSlugs = await getAllDbSlugs();

  const slugMap = new Map<string, { slug: string; locale: string }>();
  for (const s of fileSlugs) slugMap.set(s.slug, s);
  for (const s of dbSlugs) slugMap.set(s.slug, s);

  return Array.from(slugMap.values());
}
