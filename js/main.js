/**
 * CV DevOps: language and theme switching, contact form, visit notifications.
 * Author: Kyrylo Hnelenko
 */

const CONFIG = {
  TELEGRAM: {
    BOT_TOKEN: '8472754597:AAHCkQVxbosnVu6RM0U4HyL63DWlurjEziY',
    CHAT_ID: '-4896754848',
    API_URL: 'https://api.telegram.org/bot'
  }
};

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

/* --- Telegram ------------------------------------------------------------- */

async function sendTelegram(text) {
  try {
    const res = await fetch(`${CONFIG.TELEGRAM.API_URL}${CONFIG.TELEGRAM.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CONFIG.TELEGRAM.CHAT_ID, text, parse_mode: 'HTML' })
    });
    return res.ok;
  } catch (err) {
    console.error('Telegram error:', err);
    return false;
  }
}

const escapeHtml = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

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

  const ok = await sendTelegram(
`📧 Нове повідомлення з сайту CV!

👤 Ім'я: ${escapeHtml(name)}
📧 Email: ${escapeHtml(email)}

💬 Повідомлення:
${escapeHtml(message)}

🕐 Час: ${new Date().toLocaleString('uk-UA')}`);

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

function browserInfo() {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return 'Edge';
  if (/OPR\//.test(ua)) return 'Opera';
  if (/Firefox\//.test(ua)) return 'Firefox';
  if (/Chrome\//.test(ua)) return 'Chrome';
  if (/Safari\//.test(ua)) return 'Safari';
  return 'Unknown';
}

async function notifyVisit() {
  let v = {};
  try {
    const res = await fetch('https://ipapi.co/json/');
    if (res.ok) v = await res.json();
  } catch (err) {
    console.error('Visitor data error:', err);
  }
  await sendTelegram(
`📄 Сторінку відкрито!
<pre>
🌐 Браузер: ${browserInfo()}
🌐 IP: ${v.ip || 'Unknown'}
🌐 Локація: ${v.city || 'Unknown'}, ${v.country_name || 'Unknown'}
</pre>
🕐 Час: ${new Date().toLocaleString('uk-UA')}`);
}

notifyVisit();
