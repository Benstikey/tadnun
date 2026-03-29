import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Client } from "@/lib/types";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ClientProject {
  id: number;
  name: string;
  type: string;
  status: string;
  target_date: string | null;
}

export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (!client) notFound();

  const c = client as Client;

  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, type, status, target_date")
    .eq("client_id", id)
    .order("created_at", { ascending: false });

  const clientProjects = (projects ?? []) as ClientProject[];

  return (
    <div>
      <Link href="/clients" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">← Clients</Link>

      <div className="flex items-start justify-between mt-2 mb-6">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">{c.company_name}</h1>
          <div className="flex gap-4 mt-1 text-[13px] text-[var(--muted)]">
            <span>{c.sector}</span>
            <span>{c.city}</span>
            <span>{c.status}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-4">
          <h2 className="text-[13px] font-medium mb-3">Contact</h2>
          <dl className="space-y-2 text-[13px]">
            <div><dt className="text-[var(--muted)] text-xs">Name</dt><dd>{c.contact_name}</dd></div>
            {c.contact_email && <div><dt className="text-[var(--muted)] text-xs">Email</dt><dd>{c.contact_email}</dd></div>}
            {c.contact_phone && <div><dt className="text-[var(--muted)] text-xs">Phone</dt><dd>{c.contact_phone}</dd></div>}
            {c.website && <div><dt className="text-[var(--muted)] text-xs">Website</dt><dd><a href={c.website} target="_blank" rel="noopener noreferrer" className="hover:underline">{c.website}</a></dd></div>}
            {c.ice && <div><dt className="text-[var(--muted)] text-xs">ICE</dt><dd>{c.ice}</dd></div>}
            {c.address && <div><dt className="text-[var(--muted)] text-xs">Address</dt><dd>{c.address}</dd></div>}
          </dl>
          {c.notes && (
            <>
              <h3 className="text-[var(--muted)] text-xs mt-4 mb-1">Notes</h3>
              <p className="text-[13px] text-[var(--muted)]">{c.notes}</p>
            </>
          )}
        </div>

        {/* Projects */}
        <div className="lg:col-span-2 border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <h2 className="text-[13px] font-medium">Projects ({clientProjects.length})</h2>
            <Link href={`/projects/new`} className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">New project →</Link>
          </div>
          <table className="w-full text-[13px]">
            <tbody>
              {clientProjects.length === 0 ? (
                <tr><td className="text-center py-8 text-[var(--muted)]">No projects yet</td></tr>
              ) : (
                clientProjects.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-4 py-2.5">
                      <Link href={`/projects/${p.id}`} className="font-medium hover:underline">{p.name}</Link>
                    </td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{p.type}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{p.status.replace("_", " ")}</td>
                    <td className="px-4 py-2.5 text-right text-xs text-[var(--muted)] tabular-nums">
                      {p.target_date ? new Date(p.target_date).toLocaleDateString("en", { month: "short", day: "numeric" }) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
