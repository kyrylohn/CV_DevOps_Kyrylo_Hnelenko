# CV: Kyrylo Hnelenko, Senior DevOps Engineer

Personal CV website: [kyrylohn.github.io/CV_DevOps_Kyrylo_Hnelenko](https://kyrylohn.github.io/CV_DevOps_Kyrylo_Hnelenko/)

Fintech security & compliance. VMware, AWS, GitLab CI, Vault.

## Contents

- `index.html`: the CV in English and Ukrainian (both languages in the markup, switched with `data-l`)
- `CV_DevOps_Kyrylo_Hnelenko.pdf`: the same CV as a PDF, linked from the "Download PDF" button
- `css/style.css`: light/dark themes and print styles
- `js/main.js`: language and theme switching, contact form and visit notifications
- `worker/`: Cloudflare Worker that forwards form messages and visits to Telegram (holds the bot token)

Plain HTML, CSS and JavaScript, no build step. Fonts: Unbounded and Golos Text (Google Fonts).

## Local preview

```bash
python3 -m http.server 8000
```

## License

MIT, see [LICENSE](LICENSE).
