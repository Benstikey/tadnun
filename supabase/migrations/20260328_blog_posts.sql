-- Blog posts table
create table if not exists blog_posts (
  id serial primary key,
  slug text not null,
  locale text not null default 'fr',
  title text not null,
  description text,
  sector text,
  content text not null default '',
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published', 'archived')),
  scheduled_for timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(slug)
);

-- Index for fast locale queries
create index if not exists idx_blog_posts_locale on blog_posts(locale, status);
create index if not exists idx_blog_posts_status on blog_posts(status);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger blog_posts_updated_at
  before update on blog_posts
  for each row execute function update_updated_at();

-- Auto-publish scheduled posts (run via Supabase cron or pg_cron)
-- This can be called by a cron job:
-- select publish_scheduled_posts();
create or replace function publish_scheduled_posts()
returns void as $$
begin
  update blog_posts
  set status = 'published', published_at = now()
  where status = 'scheduled'
    and scheduled_for <= now();
end;
$$ language plpgsql;
