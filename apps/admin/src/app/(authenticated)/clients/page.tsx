import { createClient } from "@/lib/supabase-server";
import type { Client } from "@/lib/types";
import Link from "next/link";

export default async function ClientsPage() {
  const supabase = await createClient();

  const { data, count } = await supabase
    .from("clients")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false });

  const clients = (data as Client[]) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Clients</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">{count ?? 0} total</p>
        </div>
        <Link
          href="/clients/new"
          className="px-3 py-1.5 text-[13px] font-medium bg-[var(--foreground)] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          New client
        </Link>
      </div>

      <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Company</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Contact</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Sector</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">City</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Status</th>
              <th className="text-right px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Added</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-[var(--muted)]">No clients yet</td></tr>
            ) : (
              clients.map((c) => (
                <tr key={c.id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50/50">
                  <td className="px-4 py-2.5">
                    <Link href={`/clients/${c.id}`} className="font-medium hover:underline">{c.company_name}</Link>
                  </td>
                  <td className="px-4 py-2.5">
                    <span>{c.contact_name}</span>
                    {c.contact_email && <span className="block text-xs text-[var(--muted)]">{c.contact_email}</span>}
                  </td>
                  <td className="px-4 py-2.5 text-[var(--muted)]">{c.sector}</td>
                  <td className="px-4 py-2.5 text-[var(--muted)]">{c.city}</td>
                  <td className="px-4 py-2.5 text-[var(--muted)]">{c.status}</td>
                  <td className="px-4 py-2.5 text-right text-xs text-[var(--muted)] tabular-nums">
                    {new Date(c.created_at).toLocaleDateString("en", { month: "short", day: "numeric" })}
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
