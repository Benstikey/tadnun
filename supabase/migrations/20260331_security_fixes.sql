-- Fix Security Advisor errors:
-- 1. Convert SECURITY DEFINER views to SECURITY INVOKER
-- 2. Enable RLS on blog_posts

-- ============================================
-- Views: set security_invoker = on
-- This ensures views respect RLS policies of
-- the underlying tables instead of bypassing them.
-- ============================================

ALTER VIEW public.email_stats SET (security_invoker = on);
ALTER VIEW public.client_stats SET (security_invoker = on);
ALTER VIEW public.sector_stats SET (security_invoker = on);
ALTER VIEW public.project_stats SET (security_invoker = on);
ALTER VIEW public.task_stats SET (security_invoker = on);
ALTER VIEW public.pipeline_stats SET (security_invoker = on);

-- ============================================
-- blog_posts: enable RLS + policies
-- ============================================

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published posts (for the marketing site)
DROP POLICY IF EXISTS "Public can read published posts" ON public.blog_posts;
CREATE POLICY "Public can read published posts"
  ON public.blog_posts
  FOR SELECT
  USING (status = 'published');

-- Authenticated users (admin app) get full access
DROP POLICY IF EXISTS "Authenticated users have full access" ON public.blog_posts;
CREATE POLICY "Authenticated users have full access"
  ON public.blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Functions: pin search_path to prevent
-- search-path hijacking attacks
-- ============================================

CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.publish_scheduled_posts()
RETURNS void AS $$
BEGIN
  UPDATE blog_posts
  SET status = 'published', published_at = now()
  WHERE status = 'scheduled'
    AND scheduled_for <= now();
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.increment_open_count(email_row_id bigint)
RETURNS void AS $$
BEGIN
  UPDATE sequence_emails
  SET open_count = open_count + 1
  WHERE id = email_row_id;
END;
$$ LANGUAGE plpgsql SET search_path = public;
