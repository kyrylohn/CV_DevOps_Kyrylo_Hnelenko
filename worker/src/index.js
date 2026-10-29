/**
 * cv-notify: relays the CV site's contact form and visit pings to Telegram,
 * so the bot token never reaches the browser.
 *
 * POST /contact  { name, email, message, website }  (website = honeypot, must be empty)
 * POST /visit    {}
 */

const LIMITS = { name: 100, email: 200, message: 4000 };

const escapeHtml = (s) =>
  String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

const kyivTime = () =>
  new Date().toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv' });

function corsHeaders(origin, env) {
  const allowed = env.ALLOWED_ORIGINS.split(',').map((s) => s.trim());
  if (!allowed.includes(origin)) return null;
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  };
}

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...headers }
  });

async function sendTelegram(env, text) {
  const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.CHAT_ID, text, parse_mode: 'HTML' })
  });
  if (!res.ok) console.error('Telegram error', res.status, await res.text());
  return res.ok;
}

function browserName(ua = '') {
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\//.test(ua)) return 'Opera';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Unknown';
}

async function handleContact(request, env, cors) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'bad_json' }, 400, cors);
  }

  // Bots fill every field; people never see this one
  if (data.website) return json({ ok: true }, 200, cors);

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const message = String(data.message || '').trim();

  if (
    !name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message
  ) {
    return json({ ok: false, error: 'invalid' }, 400, cors);
  }

  const ok = await sendTelegram(env,
`📧 Нове повідомлення з сайту CV!

👤 Ім'я: ${escapeHtml(name)}
📧 Email: ${escapeHtml(email)}

💬 Повідомлення:
${escapeHtml(message)}

🕐 Час: ${kyivTime()}`);

  return json({ ok }, ok ? 200 : 502, cors);
}

async function handleVisit(request, env, cors) {
  const cf = request.cf || {};
  const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
  const place = [cf.city, cf.country].filter(Boolean).join(', ') || 'Unknown';

  const ok = await sendTelegram(env,
`📄 Сторінку відкрито!
<pre>
🌐 Браузер: ${browserName(request.headers.get('User-Agent') || '')}
🌐 IP: ${escapeHtml(ip)}
🌐 Локація: ${escapeHtml(place)}
</pre>
🕐 Час: ${kyivTime()}`);

  return json({ ok }, ok ? 200 : 502, cors);
}

export default {
  async fetch(request, env) {
    const cors = corsHeaders(request.headers.get('Origin') || '', env);
    if (!cors) return new Response('Forbidden', { status: 403 });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405, cors);

    const { pathname } = new URL(request.url);
    if (pathname === '/contact') return handleContact(request, env, cors);
    if (pathname === '/visit') return handleVisit(request, env, cors);
    return json({ ok: false, error: 'not_found' }, 404, cors);
  }
};
