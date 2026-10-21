-- Run once in the Supabase SQL editor.
create table public.ares_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state text not null,
  updated_at timestamptz not null default now()
);
alter table public.ares_state enable row level security;
create policy "read own state"   on public.ares_state for select using (auth.uid() = user_id);
create policy "insert own state" on public.ares_state for insert with check (auth.uid() = user_id);
create policy "update own state" on public.ares_state for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "delete own state" on public.ares_state for delete using (auth.uid() = user_id);
