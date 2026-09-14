# MANGLO Auth Email — Resend + Supabase

MANGLO keeps authentication ownership in Supabase Auth. Resend is only the SMTP delivery provider for verification and recovery emails.

## Security architecture

- Supabase creates and validates signup/recovery tokens.
- MANGLO exchanges token hashes at `/auth/confirm` and stores the resulting session in secure cookies.
- Resend only delivers the email.
- The Resend API key is the SMTP password and belongs **only in Supabase Auth SMTP settings**.
- Do **not** add the Resend API key to `NEXT_PUBLIC_*`, browser code, GitHub, or MANGLO's Hostinger environment for this integration.

## 1. Verify the sending domain in Resend

Verify the MANGLO sending domain and publish every DNS record Resend provides. Keep SPF/DKIM configured and add a DMARC policy appropriate for the domain.

Recommended auth sender:

- Sender name: `MANGLO`
- Sender address: `accounts@manglo.shop`

Keep authentication email separate from future marketing mail where practical.

## 2. Configure Supabase custom SMTP

Supabase Dashboard → Authentication → Emails / SMTP Settings → Enable custom SMTP.

Use:

- Host: `smtp.resend.com`
- Port: `465`
- Username: `resend`
- Password: the Resend API key
- Sender email: `accounts@manglo.shop`
- Sender name: `MANGLO`

The Resend API key is a secret. Paste it directly into Supabase and do not send it through chat or commit it.

## 3. Configure Supabase URL settings

Supabase Dashboard → Authentication → URL Configuration:

- Site URL: `https://manglo.shop`
- Ensure MANGLO production URLs required by Auth are allowed.

MANGLO's email templates deliberately route token hashes through the application-owned confirmation endpoint rather than exposing a session token in the email URL.

## 4. Install the MANGLO auth templates in Supabase

Supabase Dashboard → Authentication → Email Templates.

### Confirm signup

Subject:

`Verify your MANGLO email`

Paste the full contents of:

`docs/auth-email-templates/confirm-signup.html`

The verification button resolves to:

`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard`

### Reset password / Recovery

Subject:

`Reset your MANGLO password`

Paste the full contents of:

`docs/auth-email-templates/recovery.html`

The recovery button resolves to:

`{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/update-password`

## 5. Keep email confirmation enabled

Do not enable auto-confirm for public MANGLO signup. Email confirmation should remain required so an account cannot claim an email address without control of that inbox.

## 6. Protect deliverability and auth capacity

- Disable click/link tracking for authentication emails if the email provider setting can rewrite verification URLs.
- Review Supabase Authentication → Rate Limits after custom SMTP is enabled. Supabase starts custom SMTP with a conservative email rate limit.
- Keep signup/reset abuse controls enabled and add CAPTCHA before meaningful public signup volume.
- Do not add marketing copy, multiple CTAs, user-provided names, or promotional content to authentication emails.

## 7. Production verification checklist

After Resend is connected, test using a real mailbox that is not a Supabase team address:

1. Create a brand-new MANGLO account.
2. Confirm that the email comes from the verified MANGLO sender.
3. Confirm the verification button points to `https://manglo.shop/auth/confirm` and contains a token hash, not an access token.
4. Click once and verify the account reaches the MANGLO dashboard with a valid session.
5. Confirm the same link cannot be reused successfully.
6. Request password recovery.
7. Confirm the recovery email opens `/auth/confirm`, then lands on `/auth/update-password`.
8. Set a new 12+ character password and confirm login works with the new password.
9. Verify delivery/bounce status in Resend.
10. Confirm no API key, password, token, or SMTP credential appears in application logs.

## Rollback

If Resend delivery is unhealthy, do not disable email confirmation. Replace the SMTP provider in Supabase or restore a known-good SMTP provider while preserving the same MANGLO templates and `/auth/confirm` flow.
