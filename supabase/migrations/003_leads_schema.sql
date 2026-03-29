-- Contact form submissions (inbound leads)
create table if not exists leads (
  id bigint generated always as identity primary key,
  name text not null,
  contact text not null,
  sector text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  notes text,
  created_at timestamptz not null default now()
);

-- Index for filtering by status
create index if not exists idx_leads_status on leads (status);
create index if not exists idx_leads_created on leads (created_at desc);

-- RLS
alter table leads enable row level security;

create policy "Authenticated users can read leads"
  on leads for select
  to authenticated
  using (true);

create policy "Authenticated users can update leads"
  on leads for update
  to authenticated
  using (true);

create policy "Service role can insert leads"
  on leads for insert
  to anon, authenticated
  with check (true);
