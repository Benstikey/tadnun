"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import type { Project, ProjectPhase, ProjectTask } from "@/lib/types";
import Link from "next/link";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";

interface Props {
  project: Project & { client_name: string };
  phases: (ProjectPhase & { tasks: ProjectTask[] })[];
}

const TASK_STATUSES = ["todo", "in_progress", "done", "blocked"];

export function ProjectDetail({ project, phases }: Props) {
  const router = useRouter();
  const [expandedPhases, setExpandedPhases] = useState<Set<number>>(new Set(phases.map((p) => p.id)));
  const [addingPhase, setAddingPhase] = useState(false);
  const [addingTaskPhase, setAddingTaskPhase] = useState<number | null>(null);

  function togglePhase(id: number) {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  async function addPhase(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    await supabase.from("project_phases").insert({
      project_id: project.id,
      name: form.get("name") as string,
      sort_order: phases.length,
    });
    setAddingPhase(false);
    router.refresh();
  }

  async function addTask(phaseId: number, e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const supabase = createClient();
    const phase = phases.find((p) => p.id === phaseId);
    await supabase.from("project_tasks").insert({
      phase_id: phaseId,
      project_id: project.id,
      title: form.get("title") as string,
      sort_order: phase?.tasks.length ?? 0,
    });
    setAddingTaskPhase(null);
    router.refresh();
  }

  async function updateTaskStatus(taskId: number, status: string) {
    const supabase = createClient();
    await supabase.from("project_tasks").update({
      status,
      completed_at: status === "done" ? new Date().toISOString() : null,
    }).eq("id", taskId);
    router.refresh();
  }

  async function updateProjectStatus(status: string) {
    const supabase = createClient();
    await supabase.from("projects").update({
      status,
      completed_at: status === "completed" ? new Date().toISOString() : null,
    }).eq("id", project.id);
    router.refresh();
  }

  const totalTasks = phases.reduce((sum, p) => sum + p.tasks.length, 0);
  const doneTasks = phases.reduce((sum, p) => sum + p.tasks.filter((t) => t.status === "done").length, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <Link href="/projects" className="text-xs text-[var(--muted)] hover:text-[var(--foreground)]">← Projects</Link>
          <h1 className="text-lg font-semibold tracking-tight mt-1">{project.name}</h1>
          <div className="flex gap-4 mt-1 text-[13px] text-[var(--muted)]">
            <span>{project.client_name}</span>
            <span>{project.type}</span>
            {project.target_date && (
              <span>{new Date(project.target_date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric" })}</span>
            )}
            {project.budget_dh && <span>{Number(project.budget_dh).toLocaleString()} MAD</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={project.status}
            onChange={(e) => updateProjectStatus(e.target.value)}
            className="px-3 py-1.5 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none"
          >
            <option value="planning">Planning</option>
            <option value="in_progress">In Progress</option>
            <option value="review">Review</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Progress */}
      {totalTasks > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-[var(--muted)] mb-1">
            <span>{doneTasks} of {totalTasks} tasks done</span>
            <span>{Math.round((doneTasks / totalTasks) * 100)}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-[var(--foreground)] opacity-25" style={{ width: `${(doneTasks / totalTasks) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Description */}
      {project.description && (
        <p className="text-[13px] text-[var(--muted)] mb-6">{project.description}</p>
      )}

      {/* Phases */}
      <div className="space-y-3">
        {phases.map((phase) => {
          const expanded = expandedPhases.has(phase.id);
          const phaseDone = phase.tasks.filter((t) => t.status === "done").length;

          return (
            <div key={phase.id} className="border border-[var(--border)] rounded-lg bg-[var(--surface)]">
              <button
                onClick={() => togglePhase(phase.id)}
                className="w-full flex items-center gap-2 px-4 py-3 text-left"
              >
                {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <span className="text-[13px] font-medium flex-1">{phase.name}</span>
                <span className="text-xs text-[var(--muted)]">{phaseDone}/{phase.tasks.length}</span>
              </button>

              {expanded && (
                <div className="border-t border-[var(--border)]">
                  {phase.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-3 px-4 py-2 border-b border-[var(--border)] last:border-0">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className={`text-xs px-1.5 py-0.5 border border-[var(--border)] rounded bg-[var(--surface)] focus:outline-none ${
                          task.status === "done" ? "line-through text-[var(--muted)]" : ""
                        }`}
                      >
                        {TASK_STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                      <span className={`text-[13px] flex-1 ${task.status === "done" ? "line-through text-[var(--muted)]" : ""}`}>
                        {task.title}
                      </span>
                      {task.due_date && (
                        <span className={`text-xs tabular-nums ${
                          new Date(task.due_date) < new Date() && task.status !== "done" ? "text-[var(--danger)]" : "text-[var(--muted)]"
                        }`}>
                          {new Date(task.due_date).toLocaleDateString("en", { month: "short", day: "numeric" })}
                        </span>
                      )}
                    </div>
                  ))}

                  {/* Add task */}
                  {addingTaskPhase === phase.id ? (
                    <form onSubmit={(e) => addTask(phase.id, e)} className="flex gap-2 px-4 py-2">
                      <input name="title" autoFocus required placeholder="Task title" className="flex-1 px-2 py-1 text-[13px] border border-[var(--border)] rounded bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
                      <button type="submit" className="px-2 py-1 text-xs font-medium bg-[var(--foreground)] text-white rounded">Add</button>
                      <button type="button" onClick={() => setAddingTaskPhase(null)} className="px-2 py-1 text-xs text-[var(--muted)]">Cancel</button>
                    </form>
                  ) : (
                    <button onClick={() => setAddingTaskPhase(phase.id)} className="flex items-center gap-1.5 px-4 py-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)] w-full">
                      <Plus size={12} /> Add task
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Add phase */}
        {addingPhase ? (
          <form onSubmit={addPhase} className="flex gap-2">
            <input name="name" autoFocus required placeholder="Phase name" className="flex-1 px-3 py-2 text-[13px] border border-[var(--border)] rounded-md bg-[var(--surface)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
            <button type="submit" className="px-3 py-2 text-[13px] font-medium bg-[var(--foreground)] text-white rounded-md">Add</button>
            <button type="button" onClick={() => setAddingPhase(false)} className="px-3 py-2 text-[13px] text-[var(--muted)]">Cancel</button>
          </form>
        ) : (
          <button onClick={() => setAddingPhase(true)} className="flex items-center gap-1.5 text-[13px] text-[var(--muted)] hover:text-[var(--foreground)]">
            <Plus size={14} /> Add phase
          </button>
        )}
      </div>
    </div>
  );
}
