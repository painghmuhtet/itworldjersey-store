# IT WORLD JERSEY Worker API (staged, not deployed)

This folder contains the backend source for private custom-design uploads. It is **not deployed** and is not yet connected to the live website.

## Security choices
- Accepts only POST `/api/custom-design` from `https://itworldjersey.store` and `https://www.itworldjersey.store`.
- Accepts PNG, JPG, WEBP, or PDF up to 8 MB.
- Stores uploads in an R2 bucket binding intended for a **new private bucket**. Do not use the public product-image bucket.
- Does not return a public file URL.
- Uses a honeypot field for basic bot filtering.
- Does not include an email sender/API key. Email forwarding (Cloudflare Email Routing) receives mail; it does not itself send outbound order notifications.

## Before deployment
1. Create a separate **private** R2 bucket for customer uploads, after owner approval.
2. Replace the placeholder bucket name in `wrangler.toml`.
3. Add real rate limiting (Cloudflare rate-limiting binding or another approved mechanism) before public launch.
4. Configure a trusted email provider and secret for notifications to `order@itworldjersey.store`; never place credentials in browser code or GitHub.
5. Update `custom.js` to POST the form to the final Worker endpoint and verify uploads/notifications end-to-end.
6. Deploy only after explicit approval. No DNS, SSL, existing R2 bucket, or Worker deployment is changed by adding these source files.

## Free-plan notes
Cloudflare documents a Workers Free request allowance of 100,000 requests/day, but account/product limits apply. Check current usage before launch.
