# IT WORLD JERSEY — Project 2.0 Website Recovery Report

**Assessment date:** 2026-11-13  
**Scope:** Website recovery and route cleanup only. Video development is on hold. Application development is on hold. Production deployment is intentionally deferred.

## 1. Requested public pages

| Route | Source file | Source status |
|---|---|---|
| `/` | `index.html` | Present |
| `/shop` | `shop/index.html` | Present; directory route |
| `/custom-design.html` | `custom-design.html` | Present |
| `/live` | `live/index.html` | Present; directory route |
| `/contact-directory.html` | `contact-directory.html` | Present |
| `/company.html` | `company.html` | Present |
| `/legal.html` | `legal.html` | Present |

Source files exist in the repository. Direct live HTTP checks were attempted, but this execution environment could not resolve itworldjersey.store; HTTP status and canonical slash/no-slash redirects therefore remain unverified.

## 2. Changes committed to `project-2.0/website-recovery`

- Removed visible Videos navigation and homepage Videos teaser, plus video navigation/blog entries from Company, Legal and Download menus.
- Removed app promotion blocks from active Home and Shop footers and removed the Download App main-menu item. The legacy download page remains in the repository.
- Updated interface toward navy / royal-blue with restrained gold accents. Existing layout retained.
- Updated public contact display to `inquiry@itworldjersey.store`, matching the Business Directory workbook.
- Removed homepage phone, postal address and map link because those details are marked missing in the workbook.
- Kept Live Sale page and streaming content untouched. Did not change the separate video repository/service.

**Git status:** 13 commits ahead of `main`, 0 behind. `main` was not modified.

## 3. Cloudflare Email Routing inventory

- Zone: `itworldjersey.store`
- Email Routing: enabled, ready and synced.
- Verified destinations: 5, including `itworldjersey@gmail.com`.
- Routing rules: 29. `inquiry@itworldjersey.store` is enabled and forwards to `itworldjersey@gmail.com`.
- Catch-all rule: disabled.
- No routing, destination, DNS or zone settings were changed.

**Delivery caveat:** This confirms routing configuration and a verified destination address. It does not prove an actual message was accepted by the destination inbox. A human-sent test and receipt confirmation remain required.

## 4. Source workbook and registration-record constraints

- The supplied Business Registration Record confirms IT WORLD JERSEY trades under MAC STYLE COLLECTION, SSM 202303181279 (CT0124374-P), and states Sdn. Bhd. conversion/registration is pending.
- Static HTML / CSS / JS and mobile-first responsive layout.
- Product catalogue with click-to-WhatsApp ordering. No checkout/payment gateway, customer registration or unnecessary customer data collection.
- Display currency: Malaysian Ringgit (RM).
- Public inquiry email: `inquiry@itworldjersey.store`. Operational destination: `itworldjersey@gmail.com`.
- WhatsApp number, company/store address, registered address, mailing address and social profile URLs are marked missing/not supplied. Do not invent them.

## 5. Remaining verification / blockers

- Live HTTP checks for all seven routes, especially `/shop`, `/shop/`, `/live` and `/live/`.
- Desktop and mobile browser QA for navigation, assets and responsive layout.
- A real test email to `inquiry@itworldjersey.store` and confirmation of receipt at `itworldjersey@gmail.com`.
- Custom Design previews a concept and opens WhatsApp with text; selected artwork is not automatically uploaded and outbound email is not sent. Worker upload, private customer storage and email integration are not production-ready.
- Product photos/prices are described as placeholders until verified R2 assets and confirmed prices are available.

## 6. Scope guardrails and final status

- **Video development: ON HOLD.** No changes to separate video repository, Pages project, video DNS or Live Sale page.
- **Application development: ON HOLD.** No app source, builds, releases or distribution changes.
- **Production deployment: NOT DONE.** No DNS changes. No changes pushed to `main`.

Website recovery and route-cleanup changes are committed to `project-2.0/website-recovery` and ready for review. Live URL checks could not capture HTTP responses because domain resolution was unavailable from this execution environment. Complete remaining browser-route and mailbox-receipt checks before merge or deploy.
