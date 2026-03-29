import { createClient } from "@/lib/supabase-server";

interface TaskRow {
  id: number;
  title: string;
  status: string;
  priority: string;
  due_date: string | null;
  project_phases: { name: string } | null;
  projects: { id: number; name: string } | null;
}

export default async function TasksPage() {
  const supabase = await createClient();

  const { data, count } = await supabase
    .from("project_tasks")
    .select("id, title, status, priority, due_date, project_phases(name), projects(id, name)", { count: "exact" })
    .order("created_at", { ascending: false });

  const tasks = ((data ?? []) as unknown as TaskRow[]).map((t) => ({
    ...t,
    project_phases: Array.isArray(t.project_phases) ? t.project_phases[0] ?? null : t.project_phases,
    projects: Array.isArray(t.projects) ? t.projects[0] ?? null : t.projects,
  }));

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-lg font-semibold tracking-tight">Tasks</h1>
        <p className="text-[13px] text-[var(--muted)] mt-0.5">{count ?? 0} across all projects</p>
      </div>

      <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-[var(--border)]">
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Task</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Project</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Phase</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Status</th>
              <th className="text-left px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Priority</th>
              <th className="text-right px-4 py-2.5 text-xs text-[var(--muted)] font-normal">Due</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-12 text-[var(--muted)]">No tasks yet</td></tr>
            ) : (
              tasks.map((t) => {
                const overdue = t.due_date && new Date(t.due_date) < new Date() && t.status !== "done";
                return (
                  <tr key={t.id} className="border-b border-[var(--border)] last:border-0 hover:bg-gray-50/50">
                    <td className={`px-4 py-2.5 font-medium ${t.status === "done" ? "line-through text-[var(--muted)]" : ""}`}>{t.title}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{t.projects?.name ?? "—"}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{t.project_phases?.name ?? "—"}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{t.status.replace("_", " ")}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{t.priority}</td>
                    <td className={`px-4 py-2.5 text-right text-xs tabular-nums ${overdue ? "text-[var(--danger)]" : "text-[var(--muted)]"}`}>
                      {t.due_date ? new Date(t.due_date).toLocaleDateString("en", { month: "short", day: "numeric" }) : "—"}
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
