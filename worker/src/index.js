/**
 * cv-notify: relays the CV site's contact form and visits to Telegram,
 * so the bot token never reaches the browser.
 *
 * POST /contact  { name, email, message, website }  (website = honeypot, must be empty)
 * POST /visit    { visit }            -> { ok, ref }   sends the visit message
 * POST /update   { ref, visit, activity }             edits that message with on-page activity
 *                (sent with sendBeacon as text/plain, so the body is parsed as JSON text)
 */

const LIMITS = { name: 100, email: 200, message: 4000 };
const BOT_UA = /bot|crawl|spider|slurp|headless|preview|facebookexternalhit|embedly|curl|wget|python|go-http|java\/|monitor|lighthouse/i;

const escapeHtml = (s) =>
  String(s ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

// Untrusted client strings: trim, cap length, escape
const clean = (s, max = 120) => escapeHtml(String(s ?? '').trim().slice(0, max));
const num = (n, min, max) => {
  const v = Math.round(Number(n));
  return Number.isFinite(v) ? Math.min(Math.max(v, min), max) : null;
};

const kyivTime = (iso) => {
  const t = Date.parse(iso);
  const d = Number.isFinite(t) && Math.abs(Date.now() - t) < 86400000 ? new Date(t) : new Date();
  return d.toLocaleString('uk-UA', { timeZone: 'Europe/Kyiv', dateStyle: 'short', timeStyle: 'short' });
};

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

async function readJson(request) {
  try {
    return JSON.parse(await request.text());
  } catch {
    return null;
  }
}

async function telegram(env, method, payload) {
  const res = await fetch(`https://api.telegram.org/bot${env.BOT_TOKEN}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.CHAT_ID, parse_mode: 'HTML', disable_web_page_preview: true, ...payload })
  });
  const data = await res.json().catch(() => ({}));
  if (!data.ok && !/not modified/.test(data.description || '')) {
    console.error('Telegram error', method, res.status, data.description);
  }
  return data;
}

/* --- Signed message refs: only the page that created a visit message can edit it --- */

async function hmac(env, text) {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(env.BOT_TOKEN), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(text));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/[+/=]/g, '').slice(0, 22);
}

const makeRef = async (env, id) => `${id}.${await hmac(env, String(id))}`;

async function readRef(env, ref) {
  const [id, sig] = String(ref || '').split('.');
  if (!/^\d+$/.test(id || '') || !sig) return null;
  return (await hmac(env, id)) === sig ? Number(id) : null;
}

/* --- Visitor description --------------------------------------------------- */

function flag(cc) {
  if (!/^[A-Z]{2}$/.test(cc || '')) return '';
  return String.fromCodePoint(...[...cc].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

function countryName(cc) {
  try {
    return new Intl.DisplayNames(['uk'], { type: 'region' }).of(cc) || cc;
  } catch {
    return cc;
  }
}

function device(ua) {
  let os = 'Unknown OS';
  if (/iPhone|iPad|iPod/.test(ua)) os = /iPad/.test(ua) ? 'iPadOS' : 'iOS';
  else if (/Android/.test(ua)) os = 'Android';
  else if (/Windows/.test(ua)) os = 'Windows';
  else if (/Mac OS X|Macintosh/.test(ua)) os = 'macOS';
  else if (/CrOS/.test(ua)) os = 'ChromeOS';
  else if (/Linux/.test(ua)) os = 'Linux';

  const browsers = [
    ['Edge', /Edg\/(\d+)/], ['Opera', /OPR\/(\d+)/], ['Samsung Internet', /SamsungBrowser\/(\d+)/],
    ['Firefox', /(?:Firefox|FxiOS)\/(\d+)/], ['Chrome', /(?:Chrome|CriOS)\/(\d+)/], ['Safari', /Version\/(\d+).*Safari/]
  ];
  let browser = 'Unknown browser';
  for (const [name, re] of browsers) {
    const m = ua.match(re);
    if (m) { browser = `${name} ${m[1]}`; break; }
  }
  const mobile = /Mobi|Android|iPhone|iPod/.test(ua) ? '📱' : '💻';
  return { os, browser, mobile };
}

function source(visit) {
  const ref = clean(visit.referrer, 200);
  const utm = ['utm_source', 'utm_medium', 'utm_campaign']
    .map((k) => (visit.utm?.[k] ? `${k.slice(4)}=${clean(visit.utm[k], 60)}` : ''))
    .filter(Boolean)
    .join(', ');
  const from = ref || 'прямий захід або закладка';
  return utm ? `${from} (${utm})` : from;
}

function visitText(request, visit) {
  const cf = request.cf || {};
  const ua = request.headers.get('User-Agent') || '';
  const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
  const d = device(ua);

  const n = num(visit.visitNo, 1, 100000) || 1;
  const head = n > 1
    ? `🔁 <b>Повторний візит</b> (${n}-й${visit.firstSeen ? `, перший ${clean(visit.firstSeen, 20)}` : ''})`
    : '👀 <b>Новий відвідувач</b>';

  const org = cf.asOrganization ? `${escapeHtml(cf.asOrganization)} (AS${cf.asn})` : 'невідомо';
  const place = [cf.city, cf.region].filter(Boolean).map(escapeHtml).join(', ');
  const country = cf.country ? `${flag(cf.country)} ${escapeHtml(countryName(cf.country))}` : '';
  const tz = cf.timezone ? ` (${escapeHtml(cf.timezone)})` : '';
  const screen = visit.screen ? `, ${clean(visit.screen, 20)}` : '';
  const langs = clean(visit.languages, 60) || clean(request.headers.get('Accept-Language'), 60) || '?';
  const siteLang = visit.siteLang === 'uk' ? 'UA' : 'EN';

  return [
    head,
    '',
    `🏢 Мережа: ${org}`,
    `📍 ${[place, country].filter(Boolean).join(', ') || 'невідомо'}${tz}`,
    `${d.mobile} ${d.os}, ${d.browser}${screen}`,
    `🗣 Мови: ${langs}; сайт відкрито ${siteLang}`,
    `🔗 Звідки: ${source(visit)}`,
    `🌐 IP: <code>${escapeHtml(ip)}</code>`,
    `🕐 ${kyivTime(visit.openedAt)} (Київ)`
  ].join('\n');
}

function formatDuration(sec) {
  if (sec < 60) return `${sec} с`;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return s ? `${m} хв ${s} с` : `${m} хв`;
}

const CLICK_LABELS = {
  pdf: '📄 завантажив PDF',
  form: '✉️ відкрив форму',
  linkedin: 'LinkedIn',
  github: 'GitHub',
  telegram: 'Telegram',
  email: 'email',
  phone: 'телефон',
  lang: 'перемкнув мову',
  theme: 'перемкнув тему'
};

function activityText(activity = {}) {
  const sec = num(activity.seconds, 0, 86400) ?? 0;
  const scroll = num(activity.scroll, 0, 100) ?? 0;
  const lines = ['', '—', `⏱ На сторінці: ${formatDuration(sec)}, прочитано ${scroll}%`];

  const clicks = [...new Set((Array.isArray(activity.clicks) ? activity.clicks : []).map(String))]
    .filter((c) => CLICK_LABELS[c]);
  const main = clicks.filter((c) => c === 'pdf' || c === 'form').map((c) => CLICK_LABELS[c]);
  const links = clicks.filter((c) => !['pdf', 'form', 'lang', 'theme'].includes(c)).map((c) => CLICK_LABELS[c]);
  const ui = clicks.filter((c) => c === 'lang' || c === 'theme').map((c) => CLICK_LABELS[c]);

  if (main.length) lines.push(main.join(', '));
  if (links.length) lines.push(`👆 Натиснув: ${links.join(', ')}`);
  if (ui.length) lines.push(`🎛 ${ui.join(', ')}`);
  if (!clicks.length) lines.push('Нічого не натискав');
  return lines.join('\n');
}

/* --- Handlers ------------------------------------------------------------- */

async function handleContact(request, env, cors) {
  const data = await readJson(request);
  if (!data) return json({ ok: false, error: 'bad_json' }, 400, cors);

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

  const cf = request.cf || {};
  const where = [cf.city, cf.country && `${flag(cf.country)} ${countryName(cf.country)}`].filter(Boolean).join(', ');
  const org = cf.asOrganization ? `\n🏢 ${escapeHtml(cf.asOrganization)}` : '';

  const res = await telegram(env, 'sendMessage', {
    text:
`📧 <b>Нове повідомлення з сайту CV</b>

👤 ${escapeHtml(name)}
📧 ${escapeHtml(email)}${org}${where ? `\n📍 ${escapeHtml(where)}` : ''}

💬 ${escapeHtml(message)}

🕐 ${kyivTime()} (Київ)`
  });

  return json({ ok: !!res.ok }, res.ok ? 200 : 502, cors);
}

async function handleVisit(request, env, cors) {
  const data = (await readJson(request)) || {};
  if (BOT_UA.test(request.headers.get('User-Agent') || '')) return json({ ok: true, skipped: 'bot' }, 200, cors);

  const res = await telegram(env, 'sendMessage', { text: visitText(request, data.visit || {}) });
  if (!res.ok) return json({ ok: false }, 502, cors);
  return json({ ok: true, ref: await makeRef(env, res.result.message_id) }, 200, cors);
}

async function handleUpdate(request, env, cors) {
  const data = await readJson(request);
  const id = data && (await readRef(env, data.ref));
  if (!id) return json({ ok: false, error: 'bad_ref' }, 400, cors);

  const res = await telegram(env, 'editMessageText', {
    message_id: id,
    text: `${visitText(request, data.visit || {})}\n${activityText(data.activity)}`
  });
  return json({ ok: !!res.ok }, 200, cors);
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
    if (pathname === '/update') return handleUpdate(request, env, cors);
    return json({ ok: false, error: 'not_found' }, 404, cors);
  }
};
