-- Supabase SQL Editor에서 실행하여 members 테이블을 생성할 수 있습니다.
create table if not exists public.members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  level text not null default '초심',
  gender text not null default '남',
  avatar_url text,
  ranking integer,
  status text default '일반',
  user_id uuid references auth.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.members enable row level security;

create policy "Anyone can view members"
  on public.members for select
  using (true);

create policy "Authenticated users can insert members"
  on public.members for insert
  to authenticated
  with check (true);
