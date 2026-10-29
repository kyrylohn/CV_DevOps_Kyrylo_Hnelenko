# cv-notify

Cloudflare Worker that relays the CV site's contact form and visit pings to Telegram,
so the bot token never reaches the browser.

- `POST /contact` with `{ name, email, message, website }` (`website` is a honeypot)
- `POST /visit` with `{ visit }`: sends the visit message (network/ASN, location, device, referrer, UTM, repeat visits), returns a signed `ref`
- `POST /update` with `{ ref, visit, activity }`: edits that message with time on page, scroll depth and clicks (sent via `sendBeacon` as text/plain)
- Crawlers and link-preview bots are skipped
- Only `https://kyrylohn.github.io` is allowed as Origin
- Deployed at `https://cv-notify.kyrylohn.workers.dev`

## Deploy

```bash
cd worker
npx wrangler deploy
npx wrangler secret put BOT_TOKEN   # Telegram bot token, never commit it
```

`CHAT_ID` and `ALLOWED_ORIGINS` are plain vars in `wrangler.toml`.
