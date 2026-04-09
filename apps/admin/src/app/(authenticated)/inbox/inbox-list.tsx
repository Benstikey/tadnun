"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { InboxEmail } from "@/lib/types";
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";

const STEP_SHORT: Record<number, string> = { 0: "Ad hoc", 1: "Step 1", 2: "Step 2", 3: "Step 3" };

interface Props {
  emails: InboxEmail[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onCompose: () => void;
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export function InboxList({ emails, selectedId, onSelect, onCompose, currentPage, totalPages, searchQuery }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(q: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (q) params.set("q", q);
    else params.delete("q");
    params.delete("page");
    router.push(`/inbox?${params.toString()}`);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`/inbox?${params.toString()}`);
  }

  function formatDate(dateStr: string | null): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const now = new Date();
    const isToday = d.toDateString() === now.toDateString();
    if (isToday) return d.toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
    return d.toLocaleDateString("en", { month: "short", day: "numeric" });
  }

  return (
    <div className="w-[360px] border-r border-[var(--border)] bg-[var(--surface)] flex-shrink-0 flex flex-col">
      {/* Header */}
      <div className="px-3 py-2.5 border-b border-[var(--border)] flex items-center gap-2">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--muted)]" />
          <input
            type="text"
            placeholder="Search by subject, name, or email..."
            defaultValue={searchQuery}
            onChange={(e) => {
              const w = window as unknown as Record<string, ReturnType<typeof setTimeout>>;
              clearTimeout(w.__inboxSearch);
              w.__inboxSearch = setTimeout(() => handleSearch(e.target.value), 300);
            }}
            className="w-full pl-8 pr-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--background)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
          />
        </div>
        <button
          onClick={onCompose}
          className="p-1.5 rounded-md bg-[var(--foreground)] text-white hover:opacity-90"
          title="Compose"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex items-center justify-center h-full text-[13px] text-[var(--muted)]">
            No emails found
          </div>
        ) : (
          emails.map((e) => (
            <button
              key={e.id}
              onClick={() => onSelect(e.id)}
              className={`w-full text-left px-3 py-2.5 border-b border-[var(--border)] transition-colors ${
                selectedId === e.id
                  ? "bg-gray-50 border-l-2 border-l-[var(--foreground)]"
                  : "hover:bg-gray-50/50 border-l-2 border-l-transparent"
              }`}
            >
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                  e.status === "sent" ? "bg-[var(--foreground)]" : e.status === "failed" ? "bg-[var(--danger)]" : "bg-[var(--border)]"
                }`} />
                <span className="text-[13px] font-medium truncate flex-1">{e.prospect_name}</span>
                <span className="text-[11px] text-[var(--muted)] tabular-nums flex-shrink-0">
                  {formatDate(e.sent_at ?? e.scheduled_for)}
                </span>
              </div>
              <div className="pl-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[var(--muted)]">{STEP_SHORT[e.step] ?? `Step ${e.step}`}</span>
                  <span className="text-[11px] text-[var(--muted)]">&middot;</span>
                  <span className="text-[13px] truncate">{e.subject}</span>
                </div>
                <p className="text-[12px] text-[var(--muted)] truncate mt-0.5">{e.body_preview}</p>
              </div>
            </button>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-[var(--border)]">
          <span className="text-[11px] text-[var(--muted)]">Page {currentPage}/{totalPages}</span>
          <div className="flex gap-0.5">
            <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30">
              <ChevronLeft size={14} />
            </button>
            <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}
              className="p-1 rounded hover:bg-gray-100 disabled:opacity-30">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
