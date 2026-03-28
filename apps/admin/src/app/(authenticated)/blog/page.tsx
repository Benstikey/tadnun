import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import type { BlogPost } from "@/lib/types";

const STATUS_COLORS: Record<string, string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-100 text-blue-700",
  archived: "bg-orange-100 text-orange-600",
};

const LOCALE_FLAGS: Record<string, string> = {
  fr: "🇫🇷",
  en: "🇬🇧",
  ar: "🇲🇦",
};

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const status = params.status || "";
  const locale = params.locale || "";

  const supabase = await createClient();

  let query = supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (locale) query = query.eq("locale", locale);

  const { data: posts } = await query;
  const blogPosts = (posts || []) as BlogPost[];

  // Stats
  const { data: allPosts } = await supabase.from("blog_posts").select("status");
  const all = allPosts || [];
  const stats = {
    total: all.length,
    published: all.filter((p) => p.status === "published").length,
    draft: all.filter((p) => p.status === "draft").length,
    scheduled: all.filter((p) => p.status === "scheduled").length,
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold">Blog Posts</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">
            {stats.published} published, {stats.draft} drafts, {stats.scheduled} scheduled
          </p>
        </div>
        <Link
          href="/blog/new"
          className="px-4 py-2 bg-[var(--foreground)] text-white text-[13px] font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          New post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <FilterLink href="/blog" label="All" count={stats.total} active={!status} />
        <FilterLink href="/blog?status=published" label="Published" count={stats.published} active={status === "published"} />
        <FilterLink href="/blog?status=draft" label="Drafts" count={stats.draft} active={status === "draft"} />
        <FilterLink href="/blog?status=scheduled" label="Scheduled" count={stats.scheduled} active={status === "scheduled"} />
      </div>

      {/* Table */}
      <div className="border border-[var(--border)] rounded-lg overflow-hidden">
        <table className="w-full text-[13px]">
          <thead className="bg-gray-50 border-b border-[var(--border)]">
            <tr>
              <th className="text-left px-4 py-2.5 font-medium text-[var(--muted)]">Title</th>
              <th className="text-left px-4 py-2.5 font-medium text-[var(--muted)] w-20">Lang</th>
              <th className="text-left px-4 py-2.5 font-medium text-[var(--muted)] w-24">Sector</th>
              <th className="text-left px-4 py-2.5 font-medium text-[var(--muted)] w-24">Status</th>
              <th className="text-left px-4 py-2.5 font-medium text-[var(--muted)] w-36">Date</th>
            </tr>
          </thead>
          <tbody>
            {blogPosts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-[var(--muted)]">
                  No posts yet. Create your first one.
                </td>
              </tr>
            ) : (
              blogPosts.map((post) => (
                <tr key={post.id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/blog/${post.id}`} className="font-medium text-[var(--foreground)] hover:underline">
                      {post.title}
                    </Link>
                    {post.description && (
                      <p className="text-[var(--muted)] text-[12px] mt-0.5 line-clamp-1">{post.description}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-base">{LOCALE_FLAGS[post.locale] || post.locale}</span>
                    <span className="text-[var(--muted)] ml-1 uppercase text-[11px]">{post.locale}</span>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{post.sector || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${STATUS_COLORS[post.status] || "bg-gray-100 text-gray-600"}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">
                    {post.published_at
                      ? new Date(post.published_at).toLocaleDateString()
                      : post.scheduled_for
                        ? `Scheduled: ${new Date(post.scheduled_for).toLocaleDateString()}`
                        : new Date(post.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function FilterLink({ href, label, count, active }: { href: string; label: string; count: number; active: boolean }) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-md text-[13px] transition-colors ${
        active
          ? "bg-[var(--foreground)] text-white font-medium"
          : "bg-gray-100 text-[var(--muted)] hover:text-[var(--foreground)]"
      }`}
    >
      {label} ({count})
    </Link>
  );
}
