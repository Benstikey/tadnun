"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

const SECTORS = ["agriculture", "restaurants", "tourism", "healthcare", "realestate", "retail", "education", "logistics"];

export default function NewClientPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);

    const form = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error } = await supabase.from("clients").insert({
      company_name: form.get("company_name") as string,
      sector: form.get("sector") as string,
      city: form.get("city") as string,
      address: form.get("address") as string || null,
      contact_name: form.get("contact_name") as string,
      contact_email: form.get("contact_email") as string || null,
      contact_phone: form.get("contact_phone") as string || null,
      website: form.get("website") as string || null,
      ice: form.get("ice") as string || null,
      notes: form.get("notes") as string || null,
    });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    router.push("/clients");
    router.refresh();
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-lg font-semibold tracking-tight mb-6">New Client</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Company name *</label>
            <input name="company_name" required className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Sector *</label>
            <select name="sector" required className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]">
              <option value="">Select...</option>
              {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">City *</label>
            <input name="city" required className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Address</label>
            <input name="address" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
        </div>

        <hr className="border-[var(--border)]" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Contact name *</label>
            <input name="contact_name" required className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Contact email</label>
            <input name="contact_email" type="email" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Phone</label>
            <input name="contact_phone" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
          <div>
            <label className="block text-xs text-[var(--muted)] mb-1">Website</label>
            <input name="website" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
          </div>
        </div>

        <div>
          <label className="block text-xs text-[var(--muted)] mb-1">ICE (business ID)</label>
          <input name="ice" className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
        </div>

        <div>
          <label className="block text-xs text-[var(--muted)] mb-1">Notes</label>
          <textarea name="notes" rows={3} className="w-full px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] resize-none" />
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={saving} className="px-4 py-2 text-[13px] font-medium bg-[var(--foreground)] text-white rounded-md hover:opacity-90 disabled:opacity-50">
            {saving ? "Saving..." : "Create client"}
          </button>
          <button type="button" onClick={() => router.back()} className="px-4 py-2 text-[13px] text-[var(--muted)] hover:text-[var(--foreground)]">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
