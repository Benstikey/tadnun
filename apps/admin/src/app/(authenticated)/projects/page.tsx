import { createClient } from "@/lib/supabase-server";
import Link from "next/link";

interface ProjectRow {
  id: number;
  name: string;
  type: string;
  status: string;
  priority: string;
  target_date: string | null;
  created_at: string;
  clients: { company_name: string } | null;
}

export default async function ProjectsPage() {
  const supabase = await createClient();

  const { data, count } = await supabase
    .from("projects")
    .select("id, name, type, status, priority, target_date, created_at, clients(company_name)", { count: "exact" })
    .order("updated_at", { ascending: false });

  const projects = ((data ?? []) as unknown as ProjectRow[]).map((p) => ({
    ...p,
    clients: Array.isArray(p.clients) ? p.clients[0] ?? null : p.clients,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">Projects</h1>
          <p className="text-[13px] text-[var(--muted)] mt-0.5">{count ?? 0} total</p>
        </div>
        <Link
          href="/projects/new"
          className="px-3 py-1.5 text-[13px] font-medium bg-[var(--foreground)] text-white rounded-md hover:opacity-90 transition-opacity"
        >
          New project
        </Link>
      </div>

      <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Project</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Client</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Type</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Status</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Priority</th>
              <th className="text-right px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Target</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-[var(--muted)]">No projects yet</td></tr>
            ) : (
              projects.map((p) => {
                const overdue = p.target_date && new Date(p.target_date) < new Date() && !["completed", "cancelled"].includes(p.status);
                return (
                  <tr key={p.id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50/50">
                    <td className="px-4 py-2.5">
                      <Link href={`/projects/${p.id}`} className="font-medium hover:underline">{p.name}</Link>
                    </td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{p.clients?.company_name ?? "—"}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{p.type}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{p.status.replace("_", " ")}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{p.priority}</td>
                    <td className={`px-4 py-2.5 text-right text-xs tabular-nums ${overdue ? "text-[var(--danger)]" : "text-[var(--muted)]"}`}>
                      {p.target_date ? new Date(p.target_date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" }) : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
