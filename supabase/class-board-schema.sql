-- Python Tutorial Library: Class Board schema
-- Run this file in the Supabase SQL editor for your project.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'student' check (role in ('student', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles
add column if not exists role text not null default 'student'
check (role in ('student', 'admin'));

create table if not exists public.board_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 3 and 120),
  body text not null check (char_length(body) between 3 and 6000),
  code_snippet text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.board_comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.board_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.board_votes (
  post_id uuid not null references public.board_posts(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  vote smallint not null check (vote in (-1, 1)),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

create index if not exists board_posts_created_at_idx on public.board_posts(created_at desc);
create index if not exists board_comments_post_id_idx on public.board_comments(post_id);
create index if not exists board_votes_post_id_idx on public.board_votes(post_id);

-- If you ran an earlier version of this setup, these remove the old restrictive
-- lesson/category fields so the board behaves like an open forum.
drop index if exists board_posts_lesson_idx;
drop index if exists board_posts_category_idx;
alter table public.board_posts drop column if exists lesson;
alter table public.board_posts drop column if exists category;

do $$
begin
  alter publication supabase_realtime add table public.board_posts;
exception
  when duplicate_object then null;
  when undefined_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.board_comments;
exception
  when duplicate_object then null;
  when undefined_object then null;
end;
$$;

do $$
begin
  alter publication supabase_realtime add table public.board_votes;
exception
  when duplicate_object then null;
  when undefined_object then null;
end;
$$;

alter table public.profiles enable row level security;
alter table public.board_posts enable row level security;
alter table public.board_comments enable row level security;
alter table public.board_votes enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.profiles, public.board_posts, public.board_comments, public.board_votes to anon, authenticated;
grant insert, update, delete on public.profiles, public.board_posts, public.board_comments, public.board_votes to authenticated;

drop policy if exists "Profiles are readable by everyone" on public.profiles;
create policy "Profiles are readable by everyone"
on public.profiles for select
using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles for insert
with check (auth.uid() = id and role = 'student');

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id and role = 'student');

drop policy if exists "Posts are readable by everyone" on public.board_posts;
create policy "Posts are readable by everyone"
on public.board_posts for select
using (true);

drop policy if exists "Signed-in users can create their own posts" on public.board_posts;
create policy "Signed-in users can create their own posts"
on public.board_posts for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own posts" on public.board_posts;
create policy "Users can update their own posts"
on public.board_posts for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own posts" on public.board_posts;
create policy "Users can delete their own posts"
on public.board_posts for delete
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

drop policy if exists "Comments are readable by everyone" on public.board_comments;
create policy "Comments are readable by everyone"
on public.board_comments for select
using (true);

drop policy if exists "Signed-in users can create their own comments" on public.board_comments;
create policy "Signed-in users can create their own comments"
on public.board_comments for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own comments" on public.board_comments;
create policy "Users can update their own comments"
on public.board_comments for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own comments" on public.board_comments;
create policy "Users can delete their own comments"
on public.board_comments for delete
using (
  auth.uid() = user_id
  or exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'admin'
  )
);

drop policy if exists "Votes are readable by everyone" on public.board_votes;
create policy "Votes are readable by everyone"
on public.board_votes for select
using (true);

drop policy if exists "Signed-in users can create their own votes" on public.board_votes;
create policy "Signed-in users can create their own votes"
on public.board_votes for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own votes" on public.board_votes;
create policy "Users can update their own votes"
on public.board_votes for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own votes" on public.board_votes;
create policy "Users can delete their own votes"
on public.board_votes for delete
using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists board_posts_set_updated_at on public.board_posts;
create trigger board_posts_set_updated_at
before update on public.board_posts
for each row execute function public.set_updated_at();

drop trigger if exists board_comments_set_updated_at on public.board_comments;
create trigger board_comments_set_updated_at
before update on public.board_comments
for each row execute function public.set_updated_at();

drop trigger if exists board_votes_set_updated_at on public.board_votes;
create trigger board_votes_set_updated_at
before update on public.board_votes
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1), 'Classmate')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();
