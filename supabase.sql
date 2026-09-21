-- شغّل هذا الملف مرة واحدة في Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  excerpt text,
  body text not null,
  image_url text,
  published boolean not null default false,
  published_at timestamptz,
  views integer not null default 0,
  author_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts" on public.posts
for select using (published = true);

drop policy if exists "authenticated can create posts" on public.posts;
create policy "authenticated can create posts" on public.posts
for insert to authenticated with check (author_id = auth.uid());

drop policy if exists "authenticated can update posts" on public.posts;
create policy "authenticated can update posts" on public.posts
for update to authenticated using (author_id = auth.uid()) with check (author_id = auth.uid());

drop policy if exists "authenticated can delete posts" on public.posts;
create policy "authenticated can delete posts" on public.posts
for delete to authenticated using (author_id = auth.uid());

insert into storage.buckets (id,name,public)
values ('news-images','news-images',true)
on conflict (id) do update set public=true;

drop policy if exists "public can view news images" on storage.objects;
create policy "public can view news images" on storage.objects
for select using (bucket_id='news-images');

drop policy if exists "authenticated can upload news images" on storage.objects;
create policy "authenticated can upload news images" on storage.objects
for insert to authenticated with check (bucket_id='news-images');

drop policy if exists "authenticated can delete own news images" on storage.objects;
create policy "authenticated can delete own news images" on storage.objects
for delete to authenticated using (bucket_id='news-images' and owner_id=auth.uid());
