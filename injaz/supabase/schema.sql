-- إنجاز: مخطط قاعدة البيانات (Supabase / Postgres)
-- شغّله مرة واحدة من SQL Editor.
create table if not exists public.user_kv (
  user_id uuid not null references auth.users(id) on delete cascade,
  k text not null check (k ~ '^[a-z0-9_.-]{1,64}$'),
  v jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, k)
);
alter table public.user_kv drop constraint if exists user_kv_k_check;
alter table public.user_kv add constraint user_kv_k_check check (k ~ '^[a-z0-9_.-]{1,64}$');
alter table public.user_kv enable row level security;
alter table public.user_kv force row level security;

drop policy if exists "own rows select" on public.user_kv;
drop policy if exists "own rows insert" on public.user_kv;
drop policy if exists "own rows update" on public.user_kv;
drop policy if exists "own rows delete" on public.user_kv;
create policy "own rows select" on public.user_kv for select to authenticated using (auth.uid() = user_id);
create policy "own rows insert" on public.user_kv for insert to authenticated with check (auth.uid() = user_id);
create policy "own rows update" on public.user_kv for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows delete" on public.user_kv for delete to authenticated using (auth.uid() = user_id);

-- حدود الحماية من إساءة الاستخدام: 256 ك.ب للقيمة، 4 م.ب للمستخدم، 200 مفتاح
create or replace function public.user_kv_guard() returns trigger language plpgsql as $$
declare total bigint;
begin
  if octet_length(new.v::text) > 262144 then raise exception 'value too large'; end if;
  select coalesce(sum(octet_length(v::text)), 0) into total from public.user_kv
    where user_id = new.user_id and k <> new.k;
  if total + octet_length(new.v::text) > 4194304 then raise exception 'storage quota exceeded'; end if;
  if tg_op = 'INSERT' and (select count(*) from public.user_kv where user_id = new.user_id) >= 200 then
    raise exception 'too many keys';
  end if;
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists user_kv_guard on public.user_kv;
create trigger user_kv_guard before insert or update on public.user_kv
  for each row execute function public.user_kv_guard();

-- حذف الحساب من داخل التطبيق (مطلوب في Google Play)
create or replace function public.delete_my_account() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  delete from auth.users where id = auth.uid();
end $$;

-- أقل صلاحيات ممكنة (مبدأ least privilege)
revoke all on public.user_kv from public, anon, authenticated;
grant select, insert, update, delete on public.user_kv to authenticated;
revoke all on function public.user_kv_guard() from public, anon, authenticated;
revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
grant usage on schema public to authenticated;
-- استرجاع كلمة المرور: بريد اختياري مربوط بالحساب يصله كود عند النسيان
create table if not exists public.user_contact (
  username   text primary key check (username ~ '^[a-z0-9._]{3,24}$'),
  user_id    uuid not null unique references auth.users(id) on delete cascade,
  email      text not null check (length(email) <= 120 and email ~* '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
  updated_at timestamptz not null default now(),
  last_sent  timestamptz,
  win_start  timestamptz,
  sent_n     int not null default 0
);
alter table public.user_contact enable row level security;
alter table public.user_contact force row level security;

drop policy if exists uc_select on public.user_contact;
drop policy if exists uc_insert on public.user_contact;
drop policy if exists uc_update on public.user_contact;
drop policy if exists uc_delete on public.user_contact;
-- المستخدم يرى ويعدّل صفّه فقط، واسم المستخدم يجب أن يطابق حسابه (يمنع انتحال اسم غيره)
create policy uc_select on public.user_contact for select to authenticated using (user_id = auth.uid());
create policy uc_insert on public.user_contact for insert to authenticated
  with check (user_id = auth.uid() and username = split_part(auth.jwt() ->> 'email', '@', 1));
create policy uc_update on public.user_contact for update to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid() and username = split_part(auth.jwt() ->> 'email', '@', 1));
create policy uc_delete on public.user_contact for delete to authenticated using (user_id = auth.uid());

revoke all on public.user_contact from public, anon, authenticated;
grant select on public.user_contact to authenticated;
grant insert (username, user_id, email) on public.user_contact to authenticated;
grant update (username, user_id, email, updated_at) on public.user_contact to authenticated;
grant delete on public.user_contact to authenticated;
