export interface Prospect {
  id: number;
  google_place_id: string | null;
  name: string;
  sector: string;
  city: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  email: string | null;
  google_rating: number | null;
  google_reviews: number;
  has_website: boolean;
  score: number;
  status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SequenceEmail {
  id: number;
  prospect_id: number;
  step: number;
  template_key: string;
  subject: string;
  body_html: string;
  scheduled_for: string;
  sent_at: string | null;
  status: string;
  resend_id: string | null;
  created_at: string;
  // Joined fields
  prospect_name?: string;
  prospect_email?: string;
  prospect_sector?: string;
}

export interface PipelineStats {
  total_prospects: number;
  new_count: number;
  scored_count: number;
  enriched_count: number;
  enrolled_count: number;
  responded_count: number;
  new_this_week: number;
  avg_score: number | null;
}

export interface EmailStats {
  total_emails: number;
  pending_count: number;
  sent_count: number;
  failed_count: number;
  sent_this_week: number;
  sent_today: number;
}

export interface SectorStat {
  sector: string;
  total: number;
  with_email: number;
  enrolled: number;
  avg_score: number | null;
}

export interface ActivityEntry {
  id: number;
  prospect_id: number | null;
  action: string;
  details: string | null;
  created_at: string;
}

// ============ Clients ============

export interface Client {
  id: number;
  prospect_id: number | null;
  company_name: string;
  sector: string;
  city: string;
  address: string | null;
  contact_name: string;
  contact_email: string | null;
  contact_phone: string | null;
  website: string | null;
  ice: string | null;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  project_count?: number;
}

// ============ Projects ============

export interface Project {
  id: number;
  client_id: number;
  name: string;
  description: string | null;
  type: string;
  status: string;
  priority: string;
  start_date: string | null;
  target_date: string | null;
  completed_at: string | null;
  budget_dh: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  client_name?: string;
  phase_count?: number;
  task_count?: number;
  done_count?: number;
}

export interface ProjectPhase {
  id: number;
  project_id: number;
  name: string;
  description: string | null;
  sort_order: number;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  tasks?: ProjectTask[];
}

export interface ProjectTask {
  id: number;
  phase_id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  completed_at: string | null;
  sort_order: number;
  created_at: string;
  // Joined
  project_name?: string;
  phase_name?: string;
}

export interface ProjectStats {
  total_projects: number;
  active_projects: number;
  completed_projects: number;
  overdue_projects: number;
}

export interface ClientStats {
  total_clients: number;
  active_clients: number;
}

// ============ Inbox ============

export interface InboxEmail {
  id: number;
  prospect_id: number;
  step: number;
  template_key: string;
  subject: string;
  body_html: string;
  body_preview: string;
  scheduled_for: string;
  sent_at: string | null;
  status: string;
  resend_id: string | null;
  created_at: string;
  opened_at: string | null;
  delivered_at: string | null;
  bounced_at: string | null;
  open_count: number;
  prospect_name: string;
  prospect_email: string;
  prospect_sector: string;
  prospect_city: string;
}

export interface InboxCounts {
  all: number;
  sent: number;
  scheduled: number;
  failed: number;
  step1: number;
  step2: number;
  step3: number;
}

// ============ Blog ============

export interface BlogPost {
  id: number;
  slug: string;
  locale: string;
  title: string;
  description: string | null;
  sector: string | null;
  content: string;
  status: "draft" | "scheduled" | "published" | "archived";
  scheduled_for: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogStats {
  total: number;
  published: number;
  draft: number;
  scheduled: number;
}

export interface TaskStats {
  total_tasks: number;
  todo_tasks: number;
  in_progress_tasks: number;
  done_tasks: number;
  blocked_tasks: number;
  overdue_tasks: number;
}
