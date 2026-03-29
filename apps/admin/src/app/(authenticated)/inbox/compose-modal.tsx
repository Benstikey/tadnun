"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import { composeEmail } from "./actions";
import { X } from "lucide-react";

interface Props {
  onClose: () => void;
}

interface ProspectOption {
  id: number;
  name: string;
  email: string;
  sector: string;
}

export function ComposeModal({ onClose }: Props) {
  const router = useRouter();
  const [prospects, setProspects] = useState<ProspectOption[]>([]);
  const [search, setSearch] = useState("");
  const [sending, setSending] = useState(false);
  const [sendNow, setSendNow] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("prospects")
      .select("id, name, email, sector")
      .not("email", "is", null)
      .order("name")
      .limit(200)
      .then(({ data }) => {
        setProspects((data ?? []) as ProspectOption[]);
      });
  }, []);

  const filtered = search
    ? prospects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase())
      )
    : prospects;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);

    const form = new FormData(e.currentTarget);
    const prospectId = Number(form.get("prospect_id"));
    const subject = form.get("subject") as string;
    const body = form.get("body") as string;
    const scheduledFor = form.get("scheduled_for") as string;

    const bodyHtml = `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"></head>
<body style="font-family: -apple-system, sans-serif; color: #1a1a1a; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
${body.split("\n").map((line) => `<p>${line || "&nbsp;"}</p>`).join("\n")}
<div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e5e5e5; font-size: 13px; color: #666;">
<strong>Tadnun</strong> — Solutions digitales pour les entreprises marocaines<br>
<a href="https://tadnun.com" style="color: #2563eb;">tadnun.com</a>
</div>
</body></html>`;

    const result = await composeEmail({
      prospect_id: prospectId,
      subject,
      body_html: bodyHtml,
      send_now: sendNow,
      scheduled_for: scheduledFor || undefined,
    });

    setSending(false);

    if (result.error) {
      alert(result.error);
      return;
    }

    router.refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/15" />
      <div
        className="relative w-full max-w-lg bg-[var(--surface)] border border-[var(--border)] rounded-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
          <h2 className="text-[14px] font-semibold">Compose Email</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 text-[var(--muted)]">
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* Recipient */}
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">To *</label>
            <input
              type="text"
              placeholder="Search prospect..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] mb-1"
            />
            <select
              name="prospect_id"
              required
              className="w-full px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
              size={Math.min(filtered.length, 5)}
            >
              {filtered.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.email} ({p.sector})
                </option>
              ))}
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Subject *</label>
            <input
              name="subject"
              required
              className="w-full px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Message *</label>
            <textarea
              name="body"
              required
              rows={8}
              placeholder="Write your email..."
              className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] resize-none leading-relaxed"
            />
          </div>

          {/* Schedule */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input
                type="radio"
                name="timing"
                checked={sendNow}
                onChange={() => setSendNow(true)}
                className="accent-[var(--foreground)]"
              />
              Send now
            </label>
            <label className="flex items-center gap-2 text-[13px] cursor-pointer">
              <input
                type="radio"
                name="timing"
                checked={!sendNow}
                onChange={() => setSendNow(false)}
                className="accent-[var(--foreground)]"
              />
              Schedule
            </label>
            {!sendNow && (
              <input
                name="scheduled_for"
                type="datetime-local"
                required={!sendNow}
                className="px-2 py-1 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="submit"
              disabled={sending}
              className="px-4 py-2 text-[13px] font-medium bg-[var(--foreground)] text-white rounded-md hover:opacity-90 disabled:opacity-50"
            >
              {sending ? "Sending..." : sendNow ? "Send" : "Schedule"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] text-[var(--muted)] hover:text-[var(--foreground)]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
