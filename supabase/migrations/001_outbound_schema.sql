-- ============================================================
-- Tadnun Admin — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New Query)
-- ============================================================

-- --------------- Prospects ---------------
CREATE TABLE IF NOT EXISTS prospects (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  google_place_id text UNIQUE,
  name text NOT NULL,
  sector text NOT NULL,
  city text NOT NULL,
  address text,
  phone text,
  website text,
  email text,
  google_rating numeric(2,1),
  google_reviews integer DEFAULT 0,
  has_website boolean DEFAULT false,
  score integer DEFAULT 0,
  status text DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_sector ON prospects(sector);
CREATE INDEX IF NOT EXISTS idx_prospects_score ON prospects(score DESC);
CREATE INDEX IF NOT EXISTS idx_prospects_city ON prospects(city);
CREATE INDEX IF NOT EXISTS idx_prospects_created ON prospects(created_at DESC);

-- Composite index for common dashboard queries
CREATE INDEX IF NOT EXISTS idx_prospects_sector_status ON prospects(sector, status);

-- --------------- Email Sequences ---------------
CREATE TABLE IF NOT EXISTS sequence_emails (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  prospect_id bigint NOT NULL REFERENCES prospects(id) ON DELETE CASCADE,
  step integer NOT NULL,
  template_key text NOT NULL,
  subject text NOT NULL,
  body_html text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  sent_at timestamptz,
  status text DEFAULT 'pending',
  resend_id text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_sequence_status_scheduled ON sequence_emails(status, scheduled_for)
  WHERE status = 'pending';
CREATE INDEX IF NOT EXISTS idx_sequence_prospect ON sequence_emails(prospect_id);

-- --------------- Activity Log ---------------
CREATE TABLE IF NOT EXISTS activity_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  prospect_id bigint REFERENCES prospects(id) ON DELETE SET NULL,
  action text NOT NULL,
  details text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at DESC);

-- --------------- Scan History ---------------
CREATE TABLE IF NOT EXISTS scan_history (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sector text NOT NULL,
  city text NOT NULL,
  query text NOT NULL,
  results_count integer DEFAULT 0,
  scanned_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scan_sector_city ON scan_history(sector, city, scanned_at DESC);

-- --------------- Updated At Trigger ---------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER prospects_updated_at
  BEFORE UPDATE ON prospects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- --------------- Row Level Security ---------------
-- Enable RLS on all tables
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE sequence_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_history ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users full access (admin app)
CREATE POLICY "Authenticated users can read prospects"
  ON prospects FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert prospects"
  ON prospects FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated users can update prospects"
  ON prospects FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can read emails"
  ON sequence_emails FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can manage emails"
  ON sequence_emails FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can read activity"
  ON activity_log FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert activity"
  ON activity_log FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can read scans"
  ON scan_history FOR SELECT TO authenticated USING (true);

-- Allow service role full access (outbound scripts)
-- Service role bypasses RLS by default, no policies needed.

-- --------------- Dashboard Views ---------------
CREATE OR REPLACE VIEW pipeline_stats AS
SELECT
  COUNT(*) AS total_prospects,
  COUNT(*) FILTER (WHERE status = 'new') AS new_count,
  COUNT(*) FILTER (WHERE status = 'scored') AS scored_count,
  COUNT(*) FILTER (WHERE status = 'enriched') AS enriched_count,
  COUNT(*) FILTER (WHERE status = 'enrolled') AS enrolled_count,
  COUNT(*) FILTER (WHERE status = 'responded') AS responded_count,
  COUNT(*) FILTER (WHERE created_at >= now() - interval '7 days') AS new_this_week,
  AVG(score) FILTER (WHERE score > 0) AS avg_score
FROM prospects;

CREATE OR REPLACE VIEW email_stats AS
SELECT
  COUNT(*) AS total_emails,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
  COUNT(*) FILTER (WHERE status = 'sent') AS sent_count,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed_count,
  COUNT(*) FILTER (WHERE sent_at >= now() - interval '7 days') AS sent_this_week,
  COUNT(*) FILTER (WHERE sent_at >= now() - interval '1 day') AS sent_today
FROM sequence_emails;

CREATE OR REPLACE VIEW sector_stats AS
SELECT
  sector,
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE email IS NOT NULL) AS with_email,
  COUNT(*) FILTER (WHERE status = 'enrolled') AS enrolled,
  AVG(score) FILTER (WHERE score > 0) AS avg_score
FROM prospects
GROUP BY sector
ORDER BY total DESC;
