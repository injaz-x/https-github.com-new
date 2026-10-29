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
