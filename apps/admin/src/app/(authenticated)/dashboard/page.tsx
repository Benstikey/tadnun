import { createClient } from "@/lib/supabase-server";
import { StatCard } from "@/components/stat-card";
import type { PipelineStats, EmailStats, ProjectStats, ClientStats, TaskStats, ActivityEntry } from "@/lib/types";
import Link from "next/link";

const STEP_LABELS: Record<number, string> = { 1: "Pain + Proof", 2: "Case Study", 3: "Breakup" };

interface RecentEmail {
  id: number;
  step: number;
  subject: string;
  status: string;
  sent_at: string | null;
  scheduled_for: string;
  prospects: { name: string; email: string } | null;
}

interface ActiveProject {
  id: number;
  name: string;
  status: string;
  type: string;
  target_date: string | null;
  clients: { company_name: string } | null;
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const [pipelineRes, emailRes, projectRes, clientRes, taskRes, activityRes, recentEmailsRes, activeProjectsRes] = await Promise.all([
    supabase.from("pipeline_stats").select("*").single(),
    supabase.from("email_stats").select("*").single(),
    supabase.from("project_stats").select("*").single(),
    supabase.from("client_stats").select("*").single(),
    supabase.from("task_stats").select("*").single(),
    supabase.from("activity_log").select("*").order("created_at", { ascending: false }).limit(8),
    supabase.from("sequence_emails").select("id, step, subject, status, sent_at, scheduled_for, prospects(name, email)").order("sent_at", { ascending: false, nullsFirst: false }).limit(8),
    supabase.from("projects").select("id, name, status, type, target_date, clients(company_name)").in("status", ["planning", "in_progress", "review"]).order("updated_at", { ascending: false }).limit(6),
  ]);

  const pipeline = (pipelineRes.data as PipelineStats) ?? { total_prospects: 0, new_count: 0, scored_count: 0, enriched_count: 0, enrolled_count: 0, responded_count: 0, new_this_week: 0, avg_score: null };
  const emails = (emailRes.data as EmailStats) ?? { total_emails: 0, pending_count: 0, sent_count: 0, failed_count: 0, sent_this_week: 0, sent_today: 0 };
  const proj = (projectRes.data as ProjectStats) ?? { total_projects: 0, active_projects: 0, completed_projects: 0, overdue_projects: 0 };
  const cl = (clientRes.data as ClientStats) ?? { total_clients: 0, active_clients: 0 };
  const tasks = (taskRes.data as TaskStats) ?? { total_tasks: 0, todo_tasks: 0, in_progress_tasks: 0, done_tasks: 0, blocked_tasks: 0, overdue_tasks: 0 };
  const activity = (activityRes.data as ActivityEntry[]) ?? [];
  const recentEmails = ((recentEmailsRes.data ?? []) as unknown as RecentEmail[]).map((e) => ({
    ...e,
    prospects: Array.isArray(e.prospects) ? e.prospects[0] ?? null : e.prospects,
  }));
  const activeProjects = ((activeProjectsRes.data ?? []) as unknown as ActiveProject[]).map((p) => ({
    ...p,
    clients: Array.isArray(p.clients) ? p.clients[0] ?? null : p.clients,
  }));

  return (
    <div>
      <h1 className="text-lg font-semibold tracking-tight mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <StatCard label="Active Projects" value={proj.active_projects} subvalue={proj.overdue_projects > 0 ? `${proj.overdue_projects} overdue` : undefined} />
        <StatCard label="Clients" value={cl.active_clients} />
        <StatCard label="Tasks" value={`${tasks.done_tasks}/${tasks.total_tasks}`} subvalue={tasks.overdue_tasks > 0 ? `${tasks.overdue_tasks} overdue` : undefined} />
        <StatCard label="Prospects" value={pipeline.total_prospects} subvalue={`+${pipeline.new_this_week} this week`} />
        <StatCard label="Emails Sent" value={emails.sent_count} subvalue={`${emails.pending_count} pending`} />
        <StatCard label="Failed" value={emails.failed_count} subvalue={emails.failed_count > 0 ? "Needs attention" : undefined} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Active Projects */}
        <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <h2 className="text-[13px] font-medium">Active Projects</h2>
            <Link href="/projects" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">View all →</Link>
          </div>
          <table className="w-full text-[13px]">
            <tbody>
              {activeProjects.length === 0 ? (
                <tr><td className="text-center py-8 text-[var(--muted)]">No active projects</td></tr>
              ) : (
                activeProjects.map((p) => (
                  <tr key={p.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="px-4 py-2.5">
                      <Link href={`/projects/${p.id}`} className="font-medium hover:underline">{p.name}</Link>
                      <span className="block text-xs text-[var(--muted)]">{p.clients?.company_name ?? "—"}</span>
                    </td>
                    <td className="px-4 py-2.5 text-[var(--muted)]">{p.type}</td>
                    <td className="px-4 py-2.5 text-[var(--muted)] text-xs">{p.status.replace("_", " ")}</td>
                    <td className="px-4 py-2.5 text-right text-xs text-[var(--muted)] tabular-nums">
                      {p.target_date ? new Date(p.target_date).toLocaleDateString("en", { month: "short", day: "numeric" }) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Recent Emails */}
        <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <h2 className="text-[13px] font-medium">Recent Emails</h2>
            <Link href="/outbound/emails" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">View all →</Link>
          </div>
          <table className="w-full text-[13px]">
            <tbody>
              {recentEmails.length === 0 ? (
                <tr><td className="text-center py-8 text-[var(--muted)]">No emails yet</td></tr>
              ) : (
                recentEmails.map((e) => (
                  <tr key={e.id} className="border-b border-[var(--border)] last:border-0">
                    <td className="pl-4 py-2.5 w-4">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${
                        e.status === "sent" ? "bg-[var(--foreground)]" : e.status === "failed" ? "bg-[var(--danger)]" : "bg-[var(--border)]"
                      }`} />
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="font-medium">{e.prospects?.name ?? "—"}</span>
                      <span className="block text-xs text-[var(--muted)]">{e.prospects?.email ?? ""}</span>
                    </td>
                    <td className="px-3 py-2.5 text-[var(--muted)] text-xs">{STEP_LABELS[e.step] ?? `Step ${e.step}`}</td>
                    <td className="px-4 py-2.5 text-right text-xs text-[var(--muted)] tabular-nums">
                      {e.sent_at ? new Date(e.sent_at).toLocaleDateString("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "scheduled"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity */}
      <div className="border border-[var(--border)] rounded-lg bg-[var(--surface)] p-4">
        <h2 className="text-[13px] font-medium mb-3">Recent Activity</h2>
        {activity.length === 0 ? (
          <p className="text-[13px] text-[var(--muted)]">No activity yet</p>
        ) : (
          <div className="space-y-0">
            {activity.map((a) => (
              <div key={a.id} className="flex gap-3 py-1.5">
                <span className="text-xs text-[var(--muted)] tabular-nums whitespace-nowrap w-32">
                  {new Date(a.created_at).toLocaleDateString("en", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                </span>
                <span className="text-[13px]">{a.action.replace(/_/g, " ")}</span>
                {a.details && <span className="text-[13px] text-[var(--muted)] truncate">{a.details}</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
