# IT WORLD JERSEY — Project 2.0 Website Recovery Report

**Assessment date:** 2026-11-13  
**Scope:** Website only. Video development and application development are on hold.

## Recovery status

The requested website source pages are present in the GitHub `main` branch:

| Public route | Source |
|---|---|
| `/` | `index.html` |
| `/shop` | `shop/index.html` |
| `/custom-design.html` | `custom-design.html` |
| `/live/` | `live/index.html` |
| `/contact-directory.html` | `contact-directory.html` |
| `/company.html` | `company.html` |
| `/legal.html` | `legal.html` |

Public indexed page evidence on the assessment date showed the homepage, shop, custom design, live sale, contact directory, company and legal pages were accessible. Search indexing is not a substitute for an origin HTTP response test; direct status-code verification remains open.

## Infrastructure inventory

- GitHub source repository: `painghmuhtet/itworldjersey-store`, default branch `main`.
- Cloudflare zone `itworldjersey.store`: active and not paused.
- Apex IPv4/IPv6 DNS entries point at GitHub Pages and are proxied by Cloudflare.
- `www.itworldjersey.store` CNAME points to `painghmuhtet.github.io`.
- Cloudflare Pages project `it-world-community-feed` is bound to the separate `painghmuhtet/itworldjersey-video` repository and owns `videos.itworldjersey.store`. Its latest production deployment reports success (2026-10-29).
- Video repository, video Pages project and video DNS records are explicitly out of scope.

## Website defects / cleanup

1. The homepage has a visible Videos navigation item and a dedicated Videos teaser section linking to the external video subdomain.
2. Company, Legal and Download pages contain Videos navigation items. Company also contains a blog link to video highlights.
3. `shop/index.html` is the canonical catalog page. Legacy `shop.html` remains in the repository and uses older stylesheet/script query versions.
4. The README documents that the custom-design page is a concept/quote flow: the logo selection is preview-only, the design preview is not uploaded, and the form opens WhatsApp with text. Private upload handling, email provider and storage are not production-ready. Do not advertise this as a completed file upload flow.
5. Department email addresses are published aliases; Cloudflare Email Routing destinations still require setup and delivery testing per the README.

## Changes staged on `project-2.0/website-recovery`

- Remove the Videos navigation link from `index.html`, `company.html`, `legal.html` and `download.html`.
- Remove the homepage Videos teaser section.
- Remove the Company blog link to video highlights.
- Do not alter the separate video service or any Live Sale embed/content.

## Remaining verification

- Verify direct HTTP status and canonical redirects for `/shop`, `/shop/`, `/live` and `/live/`.
- Check all seven requested public URLs from an external browser and confirm internal navigation/assets on desktop and mobile.
- Confirm that no video-page link remains in the store UI except the separately managed video product itself (not in this website task).
- Confirm Cloudflare Email Routing delivery for the documented aliases.
- Review custom-design form limitations and keep language accurate.
- Do not change DNS or deploy production until the route and hosting mapping is confirmed.

## Hold notice

**Video development: on hold for the user's planned two-hour window.**  
**Application development: on hold.**  
This task covers website page recovery and route cleanup only.
