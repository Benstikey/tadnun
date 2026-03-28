"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { BlogPost } from "@/lib/types";

const SECTORS = [
  { value: "", label: "None (cross-sector)" },
  { value: "agriculture", label: "Agriculture" },
  { value: "restaurants", label: "Restaurants" },
  { value: "tourism", label: "Tourism" },
  { value: "healthcare", label: "Healthcare" },
  { value: "retail", label: "Retail" },
  { value: "education", label: "Education" },
  { value: "realestate", label: "Real Estate" },
  { value: "logistics", label: "Logistics" },
];

const LOCALES = [
  { value: "fr", label: "🇫🇷 Francais" },
  { value: "en", label: "🇬🇧 English" },
  { value: "ar", label: "🇲🇦 العربية" },
];

interface BlogFormProps {
  post?: BlogPost;
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [description, setDescription] = useState(post?.description || "");
  const [locale, setLocale] = useState(post?.locale || "fr");
  const [sector, setSector] = useState(post?.sector || "");
  const [content, setContent] = useState(post?.content || "");
  const [status, setStatus] = useState<string>(post?.status || "draft");
  const [scheduledFor, setScheduledFor] = useState(post?.scheduled_for?.slice(0, 16) || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function generateSlug(text: string) {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isEdit && !slug) {
      setSlug(generateSlug(val));
    }
  }

  async function handleSave(action: "draft" | "publish" | "schedule") {
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required");
      return;
    }

    setSaving(true);
    setError("");

    const supabase = createClient();
    const now = new Date().toISOString();

    const data: Record<string, unknown> = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
      locale,
      sector: sector || null,
      content,
      updated_at: now,
    };

    if (action === "publish") {
      data.status = "published";
      data.published_at = now;
      data.scheduled_for = null;
    } else if (action === "schedule") {
      if (!scheduledFor) {
        setError("Select a date to schedule");
        setSaving(false);
        return;
      }
      data.status = "scheduled";
      data.scheduled_for = new Date(scheduledFor).toISOString();
      data.published_at = null;
    } else {
      data.status = "draft";
      data.scheduled_for = null;
      data.published_at = null;
    }

    let result;
    if (isEdit) {
      result = await supabase.from("blog_posts").update(data).eq("id", post.id);
    } else {
      data.created_at = now;
      result = await supabase.from("blog_posts").insert(data);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/blog");
    router.refresh();
  }

  async function handleDelete() {
    if (!isEdit || !confirm("Delete this post?")) return;
    const supabase = createClient();
    await supabase.from("blog_posts").delete().eq("id", post.id);
    router.push("/blog");
    router.refresh();
  }

  return (
    <div className="max-w-4xl">
      {error && (
        <div className="mb-4 px-4 py-2.5 bg-red-50 text-red-700 text-[13px] rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-3 gap-6">
        {/* Main content — 2 cols */}
        <div className="col-span-2 space-y-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="Article title"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-[13px] font-mono focus:outline-none focus:ring-2 focus:ring-gray-200"
              placeholder="article-url-slug"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-gray-200 resize-none"
              placeholder="Short description for SEO and article preview"
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5">
              Content <span className="text-[var(--muted)] font-normal">(Markdown)</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={24}
              className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-[13px] font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-gray-200 resize-y"
              placeholder="Write your article in Markdown..."
            />
          </div>
        </div>

        {/* Sidebar — 1 col */}
        <div className="space-y-4">
          <div className="border border-[var(--border)] rounded-lg p-4 space-y-4">
            <h3 className="text-[13px] font-semibold">Settings</h3>

            <div>
              <label className="block text-[12px] text-[var(--muted)] mb-1">Language</label>
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-[13px] focus:outline-none"
              >
                {LOCALES.map((l) => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] text-[var(--muted)] mb-1">Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-[13px] focus:outline-none"
              >
                {SECTORS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[12px] text-[var(--muted)] mb-1">Schedule for</label>
              <input
                type="datetime-local"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                className="w-full px-3 py-2 border border-[var(--border)] rounded-lg text-[13px] focus:outline-none"
              />
            </div>

            {isEdit && (
              <div className="text-[12px] text-[var(--muted)] space-y-1">
                <p>Status: <span className="font-medium text-[var(--foreground)]">{status}</span></p>
                <p>Created: {new Date(post.created_at).toLocaleString()}</p>
                {post.published_at && <p>Published: {new Date(post.published_at).toLocaleString()}</p>}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="border border-[var(--border)] rounded-lg p-4 space-y-2">
            <button
              onClick={() => handleSave("publish")}
              disabled={saving}
              className="w-full px-4 py-2 bg-[var(--foreground)] text-white text-[13px] font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving..." : isEdit && status === "published" ? "Update" : "Publish now"}
            </button>
            <button
              onClick={() => handleSave("schedule")}
              disabled={saving}
              className="w-full px-4 py-2 bg-blue-600 text-white text-[13px] font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Schedule
            </button>
            <button
              onClick={() => handleSave("draft")}
              disabled={saving}
              className="w-full px-4 py-2 border border-[var(--border)] text-[13px] font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Save as draft
            </button>
            {isEdit && (
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2 text-red-600 text-[13px] font-medium rounded-lg hover:bg-red-50 transition-colors mt-2"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
