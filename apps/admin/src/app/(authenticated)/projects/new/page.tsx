"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const TYPES = ["crm", "pos", "booking", "traceability", "website", "custom"];
const PRIORITIES = ["low", "normal", "high", "urgent"];

export default function NewProjectPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [clients, setClients] = useState<{ id: number; company_name: string }[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase.from("clients").select("id, company_name").eq("status", "active").order("company_name").then(({ data }) => {
      setClients((data ?? []) as { id: number; company_name: string }[]);
    });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    const { data, error } = await supabase.from("projects").insert({
      client_id: Number(form.get("client_id")),
      name: form.get("name") as string,
      description: form.get("description") as string || null,
      type: form.get("type") as string,
      priority: form.get("priority") as string,
      start_date: form.get("start_date") as string || null,
      target_date: form.get("target_date") as string || null,
      budget_dh: form.get("budget_dh") ? Number(form.get("budget_dh")) : null,
      notes: form.get("notes") as string || null,
    }).select("id").single();

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    router.push(`/projects/${data.id}`);
    router.refresh();
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-lg font-semibold tracking-tight mb-6">New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs text-[var(--muted)] mb-1">Client *</label>
          <select name="client_id" required className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]">
            <option value="">Select client...</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.company_name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs text-[var(--muted)] mb-1">Project name *</label>
          <input name="name" required className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Type *</label>
            <select name="type" required className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]">
              {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Priority</label>
            <select name="priority" defaultValue="normal" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]">
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Start date</label>
            <input name="start_date" type="date" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Target date</label>
            <input name="target_date" type="date" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Budget (MAD)</label>
            <input name="budget_dh" type="number" step="0.01" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[var(--muted)] mb-1">Description</label>
          <textarea name="description" rows={3} className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] resize-none" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-4 py-2 text-[13px] font-medium bg-[var(--foreground)] text-white rounded-md hover:opacity-90 disabled:opacity-50">
            {saving ? "Creating..." : "Create project"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 text-[13px] text-[var(--muted)] hover:text-[var(--foreground)]">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
