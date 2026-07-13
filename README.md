# NTC-R 2026 — Workshop Website

Source for the website of **Network Traffic Classification – Reloaded (NTC-R 2026)**, a one-day workshop co-located with **ACM CoNEXT 2026** (Utrecht, The Netherlands, December 2026).

It is a single static page — plain HTML, CSS, and a little vanilla JavaScript. **No build step, no dependencies, no framework.**

## Preview it locally

Clone the repo, then serve the folder with any static file server. For example:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Or, if you prefer Node:

```bash
npx serve .
```

That's it — what you see locally is exactly what gets published. Edit `index.html` / `assets/` and refresh the browser.

## Structure

```
index.html            # the whole page
assets/
  css/styles.css       # styles
  js/main.js           # nav toggle, smooth scroll, small enhancements
  img/                 # logos and images
```

## Deploying

The site is hosted on **GitHub Pages** using branch publishing:

- Source: **`main` branch, `/` (root)** — set under _Settings → Pages → Build and deployment_.
- Pushing to `main` redeploys automatically (usually live within ~1–2 minutes).
- HTTPS is provided automatically.

Because the site is served from a project sub-path (`https://<user>.github.io/<repo>/`), **all asset links are relative** (e.g. `assets/css/styles.css`, never `/assets/...`). Keep them that way so links don't break.

## Contributing

This is a small static site — open `index.html` and edit directly. If you spot a wrong date, name, or link, or want to suggest a design tweak, open an issue or ping the organizers.

---

_Workshop content (call for papers, dates, committees) is maintained by the NTC-R 2026 organizers._
