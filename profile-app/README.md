# IT WORLD JERSEY Profile Portal

Cloudflare Worker source for the Profile, Sign in, Sign up, and Inbox portal hostnames.

## Deploy

Worker name: `itworldjersey-profile`

Custom domains:
- `profile.itworldjersey.store`
- `signin.profile.itworldjersey.store`
- `signup.profile.itworldjersey.store`
- `messenger.profile.itworldjersey.store`

Health check: `/api/health`

## Important status

This deploy restores the missing profile portal pages and hostname routing. Authentication, user database, profile editing, and persistent inbox are intentionally not enabled until a secure account backend is implemented. The current UI does not collect passwords or personal data.
