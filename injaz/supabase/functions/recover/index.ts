// Supabase Edge Function: recover
// يرسل كود استرجاع كلمة المرور إلى البريد المربوط بالحساب.
// الأسرار المطلوبة (Project Settings > Edge Functions > Secrets):
//   BREVO_API_KEY  مفتاح Brevo (الخطة المجانية 300 رسالة يومياً)
//   MAIL_FROM      بريد مُرسِل موثّق في Brevo
// SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY يوفرهما Supabase تلقائياً.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const ok = () => new Response(JSON.stringify({ ok: true }), { headers: { ...cors, 'content-type': 'application/json' } });
const MAX_PER_HOUR = 5, COOLDOWN_MS = 60_000;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
  if (req.method !== 'POST') return new Response('{}', { status: 405, headers: cors });
  let body: { action?: string; username?: string } = {};
  try { body = await req.json(); } catch { return ok(); }
  const username = String(body.username || '').trim().toLowerCase();
  // رد موحّد دائماً حتى لا يُكشف وجود الحساب من عدمه
  if (body.action !== 'send' || !/^[a-z0-9._]{3,24}$/.test(username)) return ok();

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });
  const { data: row } = await admin.from('user_contact').select('*').eq('username', username).maybeSingle();
  if (!row) return ok();

  const now = Date.now();
  if (row.last_sent && now - new Date(row.last_sent).getTime() < COOLDOWN_MS) return ok();
  let n = row.sent_n || 0, win = row.win_start ? new Date(row.win_start).getTime() : 0;
  if (!win || now - win > 3600_000) { n = 0; win = now; }
  if (n >= MAX_PER_HOUR) return ok();

  const synthetic = `${username}@injaz.app`;
  const { data, error } = await admin.auth.admin.generateLink({ type: 'recovery', email: synthetic });
  const code = data?.properties?.email_otp;
  if (error || !code) return ok();

  const r = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': Deno.env.get('BREVO_API_KEY') || '', 'content-type': 'application/json' },
    body: JSON.stringify({
      sender: { name: 'إنجاز', email: Deno.env.get('MAIL_FROM') },
      to: [{ email: row.email }],
      subject: 'كود استرجاع كلمة المرور – إنجاز',
      htmlContent: `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:16px"><p>مرحباً،</p><p>كود استرجاع كلمة المرور لحساب <b dir="ltr">${username}</b>:</p><p style="font-size:30px;letter-spacing:6px;font-weight:bold" dir="ltr">${code}</p><p>الكود صالح لفترة قصيرة. إن لم تطلبه فتجاهل هذه الرسالة؛ حسابك آمن ولم يتغير شيء.</p></div>`,
    }),
  });
  if (r.ok) await admin.from('user_contact').update({ last_sent: new Date(now).toISOString(), win_start: new Date(win).toISOString(), sent_n: n + 1 }).eq('username', username);
  return ok();
});
