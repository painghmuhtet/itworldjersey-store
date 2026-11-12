# IT WORLD JERSEY — Project 2.0 Website Recovery Report

**Assessment date:** 2026-11-13  
**Scope:** Website recovery and route cleanup only. Video development is on hold. Application development is on hold. Production deployment is intentionally deferred.

## 1. Required website pages

The source files exist in `painghmuhtet/itworldjersey-store`:

| Requested public route | Source file | Source status |
|---|---|---|
| `https://itworldjersey.store/` | `index.html` | Present |
| `https://itworldjersey.store/shop` | `shop/index.html` | Present; directory-backed route |
| `https://itworldjersey.store/custom-design.html` | `custom-design.html` | Present |
| `https://itworldjersey.store/live` | `live/index.html` | Present; directory-backed route |
| `https://itworldjersey.store/contact-directory.html` | `contact-directory.html` | Present |
| `https://itworldjersey.store/company.html` | `company.html` | Present |
| `https://itworldjersey.store/legal.html` | `legal.html` | Present |

The source files are present, but all seven public routes have **not** been independently confirmed by live HTTP status checks in this run. Slash/no-slash canonical redirects for `/shop` and `/live` remain a verification item.

## 2. Changes committed to the recovery branch

Branch: `project-2.0/website-recovery`  
Base: `main`  
Compare result: branch is 10 commits ahead of main, 0 behind. Main was not changed.

Committed changes:
- Removed the public Videos navigation and homepage Videos teaser.
- Removed Videos navigation entries from Company, Legal and Download page menus.
- Removed the app-promotion blocks from the active homepage and shop footer.
- Kept the separately managed Live Sale page and its streaming content untouched.
- Updated the main storefront accent from bright red toward navy / royal blue with a restrained gold accent. Layout was not redesigned.
- Set the homepage and department directory primary public email display to `inquiry@itworldjersey.store`, matching the Business Directory workbook.
- Kept the departmental contact list and existing alias purposes.
- Updated README and this report with Project 2.0 scope and Email Routing findings.

Files changed on the branch:
- `index.html`
- `styles.css`
- `company.html`
- `contact-directory.html`
- `custom-design.html` (theme metadata)
- `legal.html`
- `shop/index.html`
- `download.html` (theme / Videos link cleanup only; legacy page remains in repository)
- `README.md`
- `PROJECT-2.0-WEBSITE-RECOVERY.md`

## 3. Email Routing inventory

Business Directory workbook values:
- Public email: `inquiry@itworldjersey.store`
- Operational destination: `itworldjersey@gmail.com`

Cloudflare read-only account inventory:
- Zone `itworldjersey.store`: Email Routing `enabled: true`, status `ready`, `synced: true`.
- Five destination mailboxes are listed as verified, including `itworldjersey@gmail.com`.
- 29 routing rules exist. The `inquiry@itworldjersey.store` rule exists, is enabled, and forwards to `itworldjersey@gmail.com`.
- Many departmental aliases forward to the same Gmail destination.
- Catch-all rule is disabled.

**Important:** This confirms Cloudflare routing configuration and the verified destination address. It does not prove that a real message was accepted in the destination inbox. A human-sent test message and receipt confirmation remain required.

No Cloudflare Email Routing settings, rules, addresses, DNS records, or zone settings were modified.

## 4. Spreadsheet source-of-truth constraints

The attached Business Directory workbook states:
- Static HTML / CSS / JS website.
- Product catalogue; ordering via WhatsApp.
- No checkout, payment gateway, customer registration, or unnecessary customer-data collection.
- Display currency is Malaysian Ringgit (RM).
- Mobile-first responsive layout.
- Public inquiry email is `inquiry@itworldjersey.store`.

The workbook marks official WhatsApp number, company/store address, registered address, mailing address and social profile URLs as missing or not supplied. Do not invent or add replacement contact details.

## 5. Known limitations and blockers

- Direct live HTTP response / redirect verification is still required for all seven routes, particularly `/shop`, `/shop/`, `/live` and `/live/`.
- Desktop and mobile browser QA is not fully executed.
- A real test email / mailbox receipt has not been performed.
- The custom-design page currently previews the concept and opens WhatsApp with text; it does not upload the selected artwork or send email automatically. The upload worker, private customer storage and outbound email integration are not production-ready.
- Product photos/prices are identified by README as placeholders pending verified R2 assets and confirmed prices.
- Department addresses listed in the contact directory are aliases, not independent mailboxes; verify receipt before publishing delivery guarantees.

## 6. Explicit exclusions

- Video development: **ON HOLD**. Do not modify the video repository, video Pages projects, video DNS records, or Live Sale content.
- Application development: **ON HOLD**. Do not modify app source, builds, releases, or distribution.
- Production deployment: **NOT AUTHORIZED / NOT DONE**.
- DNS changes: **NOT DONE**.
- No changes were pushed to `main`.

## 7. Final status

Website-only recovery and route-cleanup changes are committed to `project-2.0/website-recovery` and ready for review. The remaining browser-route and mailbox-receipt checks should be completed before merging or deploying.