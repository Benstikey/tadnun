"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const STEP_LABELS: Record<number, string> = {
  1: "Pain + Proof",
  2: "Case Study",
  3: "Breakup",
};

interface EmailRow {
  id: number;
  prospect_id: number;
  step: number;
  subject: string;
  body_html: string;
  scheduled_for: string;
  sent_at: string | null;
  status: string;
  prospect_name: string;
  prospect_email: string;
  prospect_sector: string;
  prospect_city: string;
}

interface Props {
  emails: EmailRow[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
  activeFilters: {
    status: string;
    step: string;
  };
}

export function EmailsTable({ emails, currentPage, totalPages, totalCount, activeFilters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openEmail, setOpenEmail] = useState<EmailRow | null>(null);

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
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
      <div className="flex gap-3 mb-5">
        <select
          value={activeFilters.status}
          onChange={(e) => updateFilter("status", e.target.value)}
          className="px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="sent">Sent</option>
          <option value="failed">Failed</option>
        </select>

        <select
          value={activeFilters.step}
          onChange={(e) => updateFilter("step", e.target.value)}
          className="px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
        >
          <option value="">All steps</option>
          <option value="1">Step 1 — Pain + Proof</option>
          <option value="2">Step 2 — Case Study</option>
          <option value="3">Step 3 — Breakup</option>
        </select>
      </div>

      {/* Table */}
      <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal w-4"></th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Prospect</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">To</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Step</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Subject</th>
              <th className="text-right px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {emails.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-[var(--muted)]">No emails found</td>
              </tr>
            ) : (
              emails.map((e) => (
                <tr
                  key={e.id}
                  onClick={() => setOpenEmail(e)}
                  className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50/50 cursor-pointer transition-colors"
                >
                  <td className="pl-4 py-2.5">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                      e.status === "sent" ? "bg-[var(--foreground)]" : e.status === "failed" ? "bg-[var(--danger)]" : "bg-[var(--border)]"
                    }`} />
                  </td>
                  <td className="px-4 py-2.5 font-medium">{e.prospect_name}</td>
                  <td className="px-4 py-2.5 text-[var(--muted)] text-xs">{e.prospect_email}</td>
                  <td className="px-4 py-2.5 text-[var(--muted)]">{e.step}. {STEP_LABELS[e.step] ?? ""}</td>
                  <td className="px-4 py-2.5 text-[var(--muted)] max-w-[280px] truncate">{e.subject}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-[var(--muted)] whitespace-nowrap tabular-nums">
                    {e.sent_at
                      ? new Date(e.sent_at).toLocaleDateString("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
                      : new Date(e.scheduled_for).toLocaleDateString("en", { month: "short", day: "numeric" }) + " (scheduled)"
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
            <p className="text-xs text-[var(--muted)]">
              Page {currentPage} of {totalPages} ({totalCount} total)
            </p>
            <div className="flex gap-1">
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Preview Panel */}
      {openEmail && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setOpenEmail(null)}>
          <div className="absolute inset-0 bg-black/10" />
          <div
            className="relative w-full max-w-2xl h-full bg-[var(--surface)] border-l border-[var(--border)] shadow-lg flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-[var(--surface)] border-b border-[var(--border)] px-6 py-4 flex items-start justify-between">
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                    openEmail.status === "sent" ? "bg-[var(--foreground)]" : openEmail.status === "failed" ? "bg-[var(--danger)]" : "bg-[var(--border)]"
                  }`} />
                  <span className="text-xs text-[var(--muted)]">{openEmail.status}</span>
                  <span className="text-xs text-[var(--muted)]">&middot;</span>
                  <span className="text-xs text-[var(--muted)]">{STEP_LABELS[openEmail.step] ?? `Step ${openEmail.step}`}</span>
                </div>
                <h2 className="text-[15px] font-semibold tracking-tight">{openEmail.subject}</h2>
                <div className="mt-2 text-[13px] text-[var(--muted)] space-y-0.5">
                  <p>To: <span className="text-[var(--foreground)]">{openEmail.prospect_name}</span> &lt;{openEmail.prospect_email}&gt;</p>
                  <p>From: wassim@tadnun.com</p>
                  {openEmail.sent_at && (
                    <p>Sent: {new Date(openEmail.sent_at).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
                  )}
                  {!openEmail.sent_at && (
                    <p>Scheduled: {new Date(openEmail.scheduled_for).toLocaleDateString("en", { weekday: "short", month: "short", day: "numeric", year: "numeric" })}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setOpenEmail(null)}
                className="p-1.5 rounded-md hover:bg-gray-100 text-[var(--muted)] hover:text-[var(--foreground)]"
              >
                <X size={16} />
              </button>
            </div>

            {/* Email Body */}
            <div className="flex-1 min-h-0">
              <OutboundEmailFrame html={openEmail.body_html} key={openEmail.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function OutboundEmailFrame({ html }: { html: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const doc = iframe.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(html);
    doc.close();

    doc.querySelectorAll("a").forEach((a) => {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }, [html]);

  return (
    <iframe
      ref={iframeRef}
      className="w-full h-full border-0"
      sandbox="allow-same-origin"
      title="Email preview"
    />
  );
}
