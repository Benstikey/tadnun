import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const COMPARE_DIR = path.join(process.cwd(), "src/content/compare");

export interface ComparePage {
  slug: string;
  locale: string;
  title: string;
  description: string;
  competitor: string;
  type: "vs" | "alternative" | "category";
  content: string;
}

export interface ComparePageMeta {
  slug: string;
  locale: string;
  title: string;
  description: string;
  competitor: string;
  type: "vs" | "alternative" | "category";
}

export function getComparePages(locale: string): ComparePageMeta[] {
  if (!fs.existsSync(COMPARE_DIR)) return [];

  const files = fs.readdirSync(COMPARE_DIR).filter((f) => f.endsWith(".md"));
  const pages: ComparePageMeta[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(COMPARE_DIR, file), "utf-8");
    const { data } = matter(raw);
    if (data.locale !== locale) continue;

    pages.push({
      slug: file.replace(/\.md$/, ""),
      locale: data.locale,
      title: data.title,
      description: data.description || "",
      competitor: data.competitor,
      type: data.type || "vs",
    });
  }

  return pages;
}

export async function getComparePage(slug: string): Promise<ComparePage | null> {
  const filePath = path.join(COMPARE_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(raw);
  const result = await remark().use(html).process(markdown);

  return {
    slug,
    locale: data.locale,
    title: data.title,
    description: data.description || "",
    competitor: data.competitor,
    type: data.type || "vs",
    content: result.toString(),
  };
}

export function getAllCompareSlugs(): { slug: string; locale: string }[] {
  if (!fs.existsSync(COMPARE_DIR)) return [];

  return fs.readdirSync(COMPARE_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(COMPARE_DIR, file), "utf-8");
      const { data } = matter(raw);
      return { slug: file.replace(/\.md$/, ""), locale: data.locale };
    });
}
