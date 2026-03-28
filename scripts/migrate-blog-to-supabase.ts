/**
 * One-time migration script: reads all markdown blog posts from src/content/blog/
 * and inserts them into the Supabase blog_posts table.
 *
 * Usage: npx tsx scripts/migrate-blog-to-supabase.ts
 *
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE env vars in .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrate() {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} markdown files to migrate.\n`);

  let inserted = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    // Check if already exists
    const { data: existing } = await supabase
      .from("blog_posts")
      .select("id")
      .eq("slug", slug)
      .single();

    if (existing) {
      console.log(`  SKIP  ${slug} (already exists)`);
      skipped++;
      continue;
    }

    const { error } = await supabase.from("blog_posts").insert({
      slug,
      locale: data.locale || "fr",
      title: data.title || slug,
      description: data.description || null,
      sector: data.sector || null,
      content,
      status: "published",
      published_at: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    });

    if (error) {
      console.log(`  ERROR ${slug}: ${error.message}`);
      errors++;
    } else {
      console.log(`  OK    ${slug}`);
      inserted++;
    }
  }

  console.log(`\nDone: ${inserted} inserted, ${skipped} skipped, ${errors} errors`);
}

migrate();
