-- ============================================================
-- Email open/delivery tracking columns
-- Run this in Supabase SQL Editor
-- ============================================================

ALTER TABLE sequence_emails
  ADD COLUMN IF NOT EXISTS opened_at timestamptz,
  ADD COLUMN IF NOT EXISTS delivered_at timestamptz,
  ADD COLUMN IF NOT EXISTS bounced_at timestamptz,
  ADD COLUMN IF NOT EXISTS complained_at timestamptz,
  ADD COLUMN IF NOT EXISTS open_count integer DEFAULT 0;

-- Function to atomically increment open count
CREATE OR REPLACE FUNCTION increment_open_count(email_row_id bigint)
RETURNS void AS $$
BEGIN
  UPDATE sequence_emails
  SET open_count = open_count + 1
  WHERE id = email_row_id;
END;
$$ LANGUAGE plpgsql;

-- Update email_stats view to include tracking data
CREATE OR REPLACE VIEW email_stats AS
SELECT
  COUNT(*) AS total_emails,
  COUNT(*) FILTER (WHERE status = 'pending') AS pending_count,
  COUNT(*) FILTER (WHERE status = 'sent') AS sent_count,
  COUNT(*) FILTER (WHERE status = 'failed') AS failed_count,
  COUNT(*) FILTER (WHERE sent_at >= now() - interval '7 days') AS sent_this_week,
  COUNT(*) FILTER (WHERE sent_at >= now() - interval '1 day') AS sent_today,
  COUNT(*) FILTER (WHERE opened_at IS NOT NULL) AS opened_count,
  COUNT(*) FILTER (WHERE delivered_at IS NOT NULL) AS delivered_count,
  COUNT(*) FILTER (WHERE bounced_at IS NOT NULL) AS bounced_count
FROM sequence_emails;
