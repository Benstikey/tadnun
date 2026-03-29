-- ============================================================
-- Tadnun Admin — Clients & Projects Schema
-- Run this in Supabase SQL Editor after 001_outbound_schema.sql
-- ============================================================

-- ============ CLIENTS ============
CREATE TABLE IF NOT EXISTS clients (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  prospect_id bigint REFERENCES prospects(id) ON DELETE SET NULL,
  company_name text NOT NULL,
  sector text NOT NULL,
  city text NOT NULL,
  address text,
  contact_name text NOT NULL,
  contact_email text,
  contact_phone text,
  website text,
  ice text,                       -- Identifiant Commun de l'Entreprise
  notes text,
  status text DEFAULT 'active',   -- active | paused | churned
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_sector ON clients(sector);

-- ============ PROJECTS ============
CREATE TABLE IF NOT EXISTS projects (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  client_id bigint NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  type text NOT NULL,              -- crm | pos | booking | traceability | website | custom
  status text DEFAULT 'planning',  -- planning | in_progress | review | completed | on_hold | cancelled
  priority text DEFAULT 'normal',  -- low | normal | high | urgent
  start_date date,
  target_date date,
  completed_at timestamptz,
  budget_dh numeric(12,2),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_client ON projects(client_id);

-- ============ PROJECT PHASES ============
CREATE TABLE IF NOT EXISTS project_phases (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id bigint NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  sort_order integer NOT NULL DEFAULT 0,
  status text DEFAULT 'pending',   -- pending | in_progress | completed | skipped
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_phases_project ON project_phases(project_id, sort_order);

-- ============ PROJECT TASKS ============
CREATE TABLE IF NOT EXISTS project_tasks (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  phase_id bigint NOT NULL REFERENCES project_phases(id) ON DELETE CASCADE,
  project_id bigint NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status text DEFAULT 'todo',      -- todo | in_progress | done | blocked
  priority text DEFAULT 'normal',
  due_date date,
  completed_at timestamptz,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tasks_phase ON project_tasks(phase_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_tasks_project ON project_tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON project_tasks(status);

-- ============ TRIGGERS ============
CREATE OR REPLACE TRIGGER clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- ============ RLS ============
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Auth read clients" ON clients FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth manage clients" ON clients FOR ALL TO authenticated USING (true);
CREATE POLICY "Auth read projects" ON projects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth manage projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Auth read phases" ON project_phases FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth manage phases" ON project_phases FOR ALL TO authenticated USING (true);
CREATE POLICY "Auth read tasks" ON project_tasks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth manage tasks" ON project_tasks FOR ALL TO authenticated USING (true);

-- ============ DASHBOARD VIEWS ============
CREATE OR REPLACE VIEW project_stats AS
SELECT
  COUNT(*) AS total_projects,
  COUNT(*) FILTER (WHERE status IN ('planning', 'in_progress', 'review')) AS active_projects,
  COUNT(*) FILTER (WHERE status = 'completed') AS completed_projects,
  COUNT(*) FILTER (WHERE target_date < CURRENT_DATE AND status NOT IN ('completed', 'cancelled')) AS overdue_projects
FROM projects;

CREATE OR REPLACE VIEW client_stats AS
SELECT
  COUNT(*) AS total_clients,
  COUNT(*) FILTER (WHERE status = 'active') AS active_clients
FROM clients;

CREATE OR REPLACE VIEW task_stats AS
SELECT
  COUNT(*) AS total_tasks,
  COUNT(*) FILTER (WHERE status = 'todo') AS todo_tasks,
  COUNT(*) FILTER (WHERE status = 'in_progress') AS in_progress_tasks,
  COUNT(*) FILTER (WHERE status = 'done') AS done_tasks,
  COUNT(*) FILTER (WHERE status = 'blocked') AS blocked_tasks,
  COUNT(*) FILTER (WHERE due_date < CURRENT_DATE AND status NOT IN ('done')) AS overdue_tasks
FROM project_tasks;
