"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Prospect } from "@/lib/types";
import { Search, ChevronLeft, ChevronRight, ExternalLink, Globe, Mail } from "lucide-react";

const STATUS_BADGE: Record<string, string> = {
  new: "bg-gray-100 text-gray-700",
  scored: "bg-blue-50 text-blue-700",
  enriched: "bg-amber-50 text-amber-700",
  enrolled: "bg-green-50 text-green-700",
  responded: "bg-emerald-50 text-emerald-700",
  qualified: "bg-purple-50 text-purple-700",
  disqualified: "bg-red-50 text-red-600",
};

interface Props {
  prospects: Prospect[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  filters: {
    statuses: string[];
    sectors: string[];
    cities: string[];
  };
  activeFilters: {
    status: string;
    sector: string;
    city: string;
    q: string;
    has_email: string;
  };
}

export function ProspectsTable({ prospects, currentPage, totalPages, totalCount, filters, activeFilters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`?${params.toString()}`);
  }

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search..."
            defaultValue={activeFilters.q}
            onChange={(e) => {
              const w = window as unknown as Record<string, ReturnType<typeof setTimeout>>;
              clearTimeout(w._searchTimer);
              w._searchTimer = setTimeout(() => updateFilter("q", e.target.value), 300);
            }}
            className="pl-8 pr-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] w-48"
          />
        </div>

        <select
          value={activeFilters.sector}
          onChange={(e) => updateFilter("sector", e.target.value)}
          className="px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
        >
          <option value="">All sectors</option>
          {filters.sectors.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={activeFilters.city}
          onChange={(e) => updateFilter("city", e.target.value)}
          className="px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
        >
          <option value="">All cities</option>
          {filters.cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={activeFilters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
        >
          <option value="">All statuses</option>
          {filters.statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={activeFilters.has_email}
          onChange={(e) => updateFilter("has_email", e.target.value)}
          className="px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
        >
          <option value="">All emails</option>
          <option value="yes">With email</option>
          <option value="no">Without email</option>
        </select>

        {(activeFilters.sector || activeFilters.city || activeFilters.status || activeFilters.q || activeFilters.has_email) && (
          <button
            onClick={() => router.push("/outbound/prospects")}
            className="px-2 py-1.5 text-[12px] text-[var(--muted)] hover:text-[var(--foreground)]"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-gray-50/50">
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Name</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Sector</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">City</th>
                <th className="text-center px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Score</th>
                <th className="text-center px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Rating</th>
                <th className="text-center px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Reviews</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Email</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Status</th>
                <th className="text-center px-4 py-3 font-medium text-[var(--muted)] text-xs uppercase tracking-wide">Links</th>
              </tr>
            </thead>
            <tbody>
              {prospects.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-12 text-[var(--muted)]">No prospects found</td>
                </tr>
              ) : (
                prospects.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3 font-medium max-w-[200px] truncate">{p.name}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{p.sector}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{p.city}</td>
                    <td className="px-4 py-3 text-center tabular-nums font-medium">
                      {p.score}
                    </td>
                    <td className="px-4 py-3 text-center text-[var(--muted)]">
                      {p.google_rating ? `${p.google_rating}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-[var(--muted)]">{p.google_reviews}</td>
                    <td className="px-4 py-3 text-[var(--muted)] max-w-[180px] truncate text-xs">
                      {p.email ? (
                        <a href={`mailto:${p.email}`} className="hover:underline flex items-center gap-1">
                          <Mail size={12} />
                          {p.email}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-[var(--muted)] text-xs">
                      {p.status}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {p.website && (
                          <a href={p.website} target="_blank" rel="noopener noreferrer" className="text-[var(--muted)] hover:text-[var(--accent)]">
                            <Globe size={14} />
                          </a>
                        )}
                        {p.google_place_id && (
                          <a
                            href={`https://www.google.com/maps/place/?q=place_id:${p.google_place_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--muted)] hover:text-[var(--accent)]"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--muted)]">
              Page {currentPage} of {totalPages} ({totalCount} total)
            </p>
            <div className="flex gap-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
