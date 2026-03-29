import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import type { Project, ProjectPhase, ProjectTask } from "@/lib/types";
import { ProjectDetail } from "./project-detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: project } = await supabase
    .from("projects")
    .select("*, clients(company_name)")
    .eq("id", id)
    .single();

  if (!project) notFound();

  const { data: phases } = await supabase
    .from("project_phases")
    .select("*")
    .eq("project_id", id)
    .order("sort_order");

  const { data: tasks } = await supabase
    .from("project_tasks")
    .select("*")
    .eq("project_id", id)
    .order("sort_order");

  const proj = project as unknown as Project & { clients: { company_name: string } | { company_name: string }[] };
  const clientName = Array.isArray(proj.clients) ? proj.clients[0]?.company_name : proj.clients?.company_name;

  // Group tasks by phase
  const phaseList = ((phases ?? []) as ProjectPhase[]).map((phase) => ({
    ...phase,
    tasks: ((tasks ?? []) as ProjectTask[]).filter((t) => t.phase_id === phase.id),
  }));

  return (
    <ProjectDetail
      project={{ ...proj, client_name: clientName ?? "—" }}
      phases={phaseList}
    />
  );
}
