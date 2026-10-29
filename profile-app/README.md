# IT WORLD JERSEY Profile Portal

Cloudflare Worker source for the Profile, Sign in, Register, and Inbox portal hostnames.

## Deployment

- Worker: `itworldjersey-profile`
- D1 binding: `DB` → `itworldjersey-profile`
- D1 tables: `users`, `sessions`, `auth_attempts`
- Domains: `profile.itworldjersey.store`, `signin.profile.itworldjersey.store`, `signup.profile.itworldjersey.store`, `messenger.profile.itworldjersey.store`
- Health endpoint: `/api/health`

## Account behavior

- Registration activates accounts immediately; email verification is not required.
- Username and email must be unique. Username is 3–24 letters, numbers, or underscores.
- Password length is 10–128 characters. Passwords are stored as PBKDF2-HMAC-SHA256 hashes with per-user random salts, never plaintext.
- Login creates a 14-day HttpOnly, Secure, SameSite=Lax cookie scoped to `.profile.itworldjersey.store`; only a SHA-256 hash of the session token is stored in D1.
- Basic per-IP registration/login throttling is stored in `auth_attempts`.
- Profile endpoint `/api/me`; register `/api/register`; login `/api/login`; logout `/api/logout`.

## Not yet implemented

- Email verification and password reset/recovery.
- Profile editing and account-linked inbox messaging.
- A user-facing way to deactivate/delete accounts.

Because email verification is disabled, a user can register an email address they do not own. Password recovery is not available, so users should use an email address they control and a unique password. Review rate limits and security logs before promoting the account system broadly.
