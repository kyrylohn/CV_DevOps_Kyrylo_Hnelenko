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
    return res.ok;
  } catch (err) {
    console.error('Notify error:', err);
    return false;
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

  const ok = await notify('/contact', { name, email, message, website: data.website || '' });

  sendBtn.disabled = false;
  if (ok) {
    form.reset();
    showStatus('ok', t('sent'));
    setTimeout(() => dialog.close(), 2000);
  } else {
    showStatus('error', t('failed'));
  }
});

/* --- Visit notification --------------------------------------------------- */

notify('/visit');
