/**
 * CV DevOps: language and theme switching, contact form, visit notifications.
 * Author: Kyrylo Hnelenko
 */

// Cloudflare Worker that relays to Telegram (source in worker/); the bot token lives there
const NOTIFY_URL = 'https://cv-notify.kyrylohn.workers.dev';

const TEXT = {
  en: {
    sending: 'Sending…',
    sent: 'Message sent. Thank you!',
    invalid: 'Fill in your name, a valid email and a message.',
    failed: 'The message was not sent. Write to kyrylohn@gmail.com instead.'
  },
  uk: {
    sending: 'Надсилаю…',
    sent: 'Повідомлення надіслано. Дякую!',
    invalid: "Вкажіть ім'я, коректний email і текст повідомлення.",
    failed: 'Повідомлення не надіслано. Напишіть на kyrylohn@gmail.com.'
  }
};

const root = document.documentElement;
const t = (key) => (TEXT[root.lang] || TEXT.en)[key];

/* --- Language ------------------------------------------------------------- */

function setLang(lang) {
  root.lang = lang;
  localStorage.setItem('cv-lang', lang);
  document.querySelectorAll('[data-set-lang]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
  });
}

document.querySelectorAll('[data-set-lang]').forEach((btn) => {
  btn.addEventListener('click', () => setLang(btn.dataset.setLang));
});
setLang(root.lang === 'uk' ? 'uk' : 'en');

/* --- Theme ---------------------------------------------------------------- */

document.getElementById('theme-toggle').addEventListener('click', () => {
  const current = root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = current === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('cv-theme', next);
});

/* --- Notifications ------------------------------------------------------- */

async function notify(path, body = {}) {
  try {
    const res = await fetch(`${NOTIFY_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true
    });
    return res.ok ? await res.json() : null;
  } catch (err) {
    console.error('Notify error:', err);
    return null;
  }
}

/* --- Contact dialog ------------------------------------------------------- */

const dialog = document.getElementById('contact');
const form = document.getElementById('contact-form');
const status = document.getElementById('contact-status');
const sendBtn = document.getElementById('contact-send');

function showStatus(state, message) {
  status.dataset.state = state;
  status.textContent = message;
}

document.getElementById('contact-open').addEventListener('click', () => {
  track('form');
  showStatus('', '');
  dialog.showModal();
});
document.getElementById('contact-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close();
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const message = (data.message || '').trim();

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showStatus('error', t('invalid'));
    return;
  }

  sendBtn.disabled = true;
  showStatus('', t('sending'));

  const ok = !!await notify('/contact', { name, email, message, website: data.website || '' });

  sendBtn.disabled = false;
  if (ok) {
    form.reset();
    showStatus('ok', t('sent'));
    setTimeout(() => dialog.close(), 2000);
  } else {
    showStatus('error', t('failed'));
  }
});

/* --- Visit notification and on-page activity ----------------------------- */

function readVisits() {
  try {
    const v = JSON.parse(localStorage.getItem('cv-visits')) || {};
    const n = (v.n || 0) + 1;
    const first = v.first || new Date().toLocaleDateString('uk-UA');
    localStorage.setItem('cv-visits', JSON.stringify({ n, first }));
    return { visitNo: n, firstSeen: n > 1 ? first : '' };
  } catch {
    return { visitNo: 1, firstSeen: '' };
  }
}

function referrerHost() {
  if (!document.referrer) return '';
  try {
    const u = new URL(document.referrer);
    return u.host === location.host ? '' : u.host.replace(/^www\./, '');
  } catch {
    return '';
  }
}

const params = new URLSearchParams(location.search);
const visit = {
  ...readVisits(),
  openedAt: new Date().toISOString(),
  referrer: referrerHost(),
  utm: Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign']
    .filter((k) => params.get(k)).map((k) => [k, params.get(k)])),
  screen: `${screen.width}×${screen.height}`,
  languages: (navigator.languages || [navigator.language]).slice(0, 3).join(', '),
  siteLang: root.lang
};

const activity = { visibleMs: 0, shownAt: Date.now(), scroll: 0, clicks: [] };
let visitRef = null;
let lastSent = '';

function track(what) {
  if (!activity.clicks.includes(what)) activity.clicks.push(what);
}

function readScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? Math.round((scrollY / max) * 100) : 100;
  activity.scroll = Math.max(activity.scroll, Math.min(pct, 100));
}

addEventListener('scroll', readScroll, { passive: true });

document.addEventListener('click', (e) => {
  const a = e.target.closest('a, [data-set-lang], #theme-toggle');
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.endsWith('.pdf')) track('pdf');
  else if (href.includes('linkedin.com')) track('linkedin');
  else if (href.includes('github.com')) track('github');
  else if (href.includes('t.me/')) track('telegram');
  else if (href.startsWith('mailto:')) track('email');
  else if (href.startsWith('tel:')) track('phone');
  else if (a.hasAttribute('data-set-lang')) track('lang');
  else if (a.id === 'theme-toggle') track('theme');
});

// Each time the tab is hidden (switching away, closing), update the visit message
function sendActivity() {
  if (!visitRef) return;
  readScroll();
  const seconds = Math.round((activity.visibleMs + (Date.now() - activity.shownAt)) / 1000);
  const body = JSON.stringify({
    ref: visitRef,
    visit,
    activity: { seconds, scroll: activity.scroll, clicks: activity.clicks }
  });
  const key = `${Math.round(seconds / 10)}|${activity.scroll}|${activity.clicks.join()}`;
  if (key === lastSent) return;
  lastSent = key;
  // text/plain keeps the beacon a "simple" CORS request (no preflight)
  navigator.sendBeacon(`${NOTIFY_URL}/update`, new Blob([body], { type: 'text/plain' }));
}

document.addEventListener('visibilitychange', () => {
  // Count only the time the page was actually visible
  if (document.visibilityState === 'hidden') {
    activity.visibleMs += Date.now() - activity.shownAt;
    activity.shownAt = Date.now();
    sendActivity();
  } else {
    activity.shownAt = Date.now();
  }
});

notify('/visit', { visit }).then((res) => {
  visitRef = res && res.ref;
});
