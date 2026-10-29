# IT WORLD JERSEY — Premium Product Catalog

Static-first website for the Malaysia-focused football jersey store.

## Canonical domain

- Primary website: https://itworldjersey.store/
- Shop: https://itworldjersey.store/shop/
- Live Sale: https://itworldjersey.store/live/
- Videos: https://videos.itworldjersey.store/
- Video media: https://media.itworldjersey.store/
- Product images: https://order.itworldjersey.store/
- Custom design page: https://itworldjersey.store/custom-design.html

The retired `itworldlive.stream` domain must not be used for new links, application home URLs, documentation, or navigation. Internal app navigation accepts the primary domain and its subdomains.

## Files

- `index.html` — homepage, menu, hero slider, categories, catalog, footer
- `styles.css` — responsive styling
- `app.js` — product cards, search, banners, WhatsApp order messages
- `custom-design.html` / `custom.js` — custom jersey studio and request UI
- `worker/index.js` — staged private upload API source (not deployed)
- `worker/wrangler.toml` — configuration template
- `live/index.html` — Live Sale page

## Launch checklist

- Verify product images and prices against the actual catalog before launch.
- Keep the customer-upload bucket private; do not expose private design files through public URLs.
- The custom-design page currently previews a design locally and opens WhatsApp with text; it does not upload the selected file or send email yet.
- Verify all product-image and video links on the canonical store domain.
- Confirm privacy, terms, refund, cookie and contact information before public launch.
- Do not create redirects or remove legacy DNS records until the canonical site and subdomain routes have been verified.

## Local preview

Open `index.html` in a browser. For best results use a local static server; the site itself requires no build step.
