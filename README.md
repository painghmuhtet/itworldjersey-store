# IT WORLD JERSEY — Premium Product Catalog

Static-first website starter for a Malaysia-focused football jersey store.

## Files
- `index.html` — homepage, menu, hero slider, categories, catalog, footer
- `styles.css` — responsive styling, dark/red menu with hover glow
- `app.js` — demo product cards, search, banner controls, WhatsApp order messages
- `custom-design.html` / `custom.js` — custom design request form UI
- `worker/index.js` — staged private upload API source (not deployed)
- `worker/wrangler.toml` — configuration template (private bucket placeholder)
- `worker/README.md` — secure upload and email integration plan

## Important prototype notes
- Product pictures and prices are placeholders. Replace them with verified R2 product image URLs and confirmed prices before launch.
- App download and social links are placeholders until the owner supplies real links.
- The custom-design form currently opens WhatsApp with text only. It does not upload the selected file or send email yet.
- Do not deploy until Worker upload handling, email provider, and private customer-upload storage have been implemented and tested.
- The intended main domain is `itworldjersey.store`. No DNS, SSL, existing repository, or R2 settings were changed while preparing this starter.

## Local preview
Open `index.html` in a browser. For best results use a local static server; the site itself requires no build step.
