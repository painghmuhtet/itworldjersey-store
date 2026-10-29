# IT WORLD JERSEY Profile Portal

Cloudflare Worker source for the Profile, Sign in, Register, and Inbox hostnames.

## Deployment

- Worker: `itworldjersey-profile`
- D1 binding: `DB` → `itworldjersey-profile`
- D1 tables: `users`, `sessions`, `auth_attempts`, `inbox_messages`
- Domains: `profile.itworldjersey.store`, `signin.profile.itworldjersey.store`, `signup.profile.itworldjersey.store`, `messenger.profile.itworldjersey.store`
- Health endpoint: `/api/health`

## Authentication

- Registration activates accounts immediately; email verification is not required.
- Username and email must be unique. Username is 3–24 letters, numbers, or underscores.
- Password length is 10–128 characters. Passwords are stored as PBKDF2-HMAC-SHA256 hashes with per-user random salts, never plaintext.
- Login creates a 14-day HttpOnly, Secure, SameSite=Lax cookie scoped to `.profile.itworldjersey.store`; only a SHA-256 hash of the session token is stored in D1.
- Basic per-IP registration/login throttling is stored in `auth_attempts`.
- Profile display name can be edited after login.

## Customer inbox

- Signed-in users can send messages and read their own message history at `messenger.profile.itworldjersey.store`.
- API: `GET/POST /api/messages`.
- Messages are stored per user in `inbox_messages`; message length is limited to 2,000 characters and send rate is limited.
- A staff/admin reply dashboard and email notifications are not yet configured. Do not advertise two-way live support until those are implemented and protected with admin authentication.

## Not yet implemented

- Email verification and password reset/recovery.
- Account deletion/deactivation UI.
- Staff/admin inbox reply interface and notification delivery.

Because email verification is disabled, a user can register an email address they do not own. Password recovery is not available, so users should use an email address they control and a unique password.
