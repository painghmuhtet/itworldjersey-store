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
- Canonical production domain: `https://itworldjersey.store/`. Videos: `https://videos.itworldjersey.store/`; Live Sale: `https://itworldjersey.store/live/`; media: `https://media.itworldjersey.store/`; product images: `https://order.itworldjersey.store/`.
- Keep all new links and configuration on the canonical store domain or its verified subdomains. Verify each route before removing any legacy DNS records.

## Official Contact Directory

Use the address that matches the purpose of the enquiry. Each address is a separate mailbox alias on the official domain; configure its destination in Cloudflare Email Routing before relying on it to receive mail.

| Department | Email address | Purpose |
|---|---|---|
| Legal | legal@itworldjersey.store | Legal notices, terms and contractual matters |
| Privacy / Data Protection (DPO) | privacy@itworldjersey.store | Personal-data and privacy requests |
| Abuse Reports | abuse@itworldjersey.store | Report abuse, impersonation or misuse |
| Security / Bug Reports | security@itworldjersey.store | Security concerns and website bug reports |
| Compliance | compliance@itworldjersey.store | Compliance and regulatory enquiries |
| Customer Support | support@itworldjersey.store | Customer service and order assistance |
| General Help | help@itworldjersey.store | General help and questions |
| General Contact | contact@itworldjersey.store | General business enquiries |
| Website Administration | admin@itworldjersey.store | Website administration and technical operations |
| Sales / Custom Orders | sales@itworldjersey.store | Sales enquiries, quotations and custom jersey orders |
| Billing / Finance | billing@itworldjersey.store | Invoices, billing and finance enquiries |
| Marketing / Media | marketing@itworldjersey.store | Marketing, media and partnership enquiries |
| Developer | developer@itworldjersey.store | Software, website and API development enquiries |
| Designer / Creative | designer@itworldjersey.store | Jersey artwork, logos, mockups and creative design enquiries |

### Website contact routing
- Main homepage (index.html): contact@itworldjersey.store
- Legal and policy page (legal.html): legal@itworldjersey.store; privacy requests: privacy@itworldjersey.store
- Company and help page (company.html): support@itworldjersey.store
- Shop pages (shop.html, shop/index.html): sales@itworldjersey.store
- Custom design page (custom-design.html): sales@itworldjersey.store

**Routing status:** These addresses are published in the website and listed here for setup. Their Cloudflare Email Routing destination rules must be configured and tested by the domain administrator. Do not assume that an address receives messages until its route is active and verified.

## Local preview
Open `index.html` in a browser. For best results use a local static server; the site itself requires no build step.
