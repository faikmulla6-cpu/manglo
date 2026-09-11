# MANGLO v1

Production-oriented Next.js marketplace foundation for MANGLO.

## Current architecture
- Next.js 15 + React 19 + TypeScript
- Supabase Auth with cookie-based SSR sessions
- Supabase Postgres used through server-side Prisma for business data
- Cashfree hosted checkout for wallet top-ups
- Server-only upstream SMM provider adapter
- Integer-paise wallet ledger and idempotent payment crediting
- SEO metadata, sitemap, robots, Organization schema and trust/legal pages

## Security model
MANGLO deliberately separates identity from money-critical business data:

1. **Supabase Auth** owns passwords, email verification, recovery and session cookies.
2. **Prisma** is the only application layer allowed to access MANGLO business tables such as wallets, orders, payments and provider mappings.
3. Browser-facing `anon` and `authenticated` Supabase roles are revoked from those business tables by `supabase/production-hardening.sql`.
4. Cashfree and SMM provider secrets remain server-only environment variables.
5. Wallet values are stored as integer paise, never floating point.

## Create the Supabase project
1. Create a new Supabase project for MANGLO.
2. In **Project Settings / Connect**, copy the project URL, publishable key and Postgres connection information.
3. In the Supabase SQL Editor, open `supabase/prisma-role.sql.example`, replace the placeholder password with a long unique password, and run it once. Never commit the real password.
4. Use that Prisma role in `DATABASE_URL` / `DIRECT_URL`.
5. Put the following values into Hostinger environment variables, never into GitHub source:

```env
NEXT_PUBLIC_SUPABASE_URL=https://PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
DATABASE_URL=postgresql://prisma.PROJECT_REF:PASSWORD@REGION.pooler.supabase.com:5432/postgres
DIRECT_URL=postgresql://prisma:PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres
```

For a persistent Hostinger Node deployment, Supavisor **session mode** is appropriate. If direct database connectivity is unavailable, use the connection option Supabase provides for your network and verify Prisma migrations before launch.

## Supabase Auth configuration
Set the Supabase Auth **Site URL** to the final HTTPS MANGLO origin, e.g. `https://manglo.in`.

For SSR email verification, change the **Confirm signup** email link to:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email
```

For SSR password recovery, change the **Reset password / Recovery** email link to:

```text
{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/auth/update-password
```

The `/auth/confirm` route exchanges the token hash for a Supabase session and stores it in secure cookies.

## Database bootstrap
After setting the database environment variables:

```bash
npm install
npx prisma generate
npx prisma db push
```

Before public launch, run `supabase/production-hardening.sql` in the Supabase SQL Editor. It enables RLS and removes direct Data API permissions from MANGLO's sensitive business tables.

Because MANGLO currently uses Prisma instead of the Supabase Data API for business records, disabling the Data API for the exposed `public` schema is an additional defense-in-depth option.

## Hostinger environment variables
Copy `.env.example` into Hostinger's environment-variable manager and replace every placeholder.

Required groups:

```text
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
DATABASE_URL
DIRECT_URL
CRON_SECRET
CASHFREE_CLIENT_ID
CASHFREE_CLIENT_SECRET
CASHFREE_API_VERSION
CASHFREE_MODE
NEXT_PUBLIC_CASHFREE_MODE
SMM_API_URL
SMM_API_KEY
SMM_RATE_CURRENCY
```

Never expose Cashfree secrets, database passwords, `CRON_SECRET`, or the upstream provider API key to the browser.

## Cashfree setup
- Keep Cashfree in sandbox until the complete money flow is verified.
- Register `https://YOURDOMAIN/api/payments/webhook` as the webhook endpoint.
- Test successful payment, failed payment, user drop-off, duplicate webhook and delayed webhook scenarios.
- MANGLO credits wallet balance only after server-side verification and idempotency checks.
- Move to production only after Cashfree approves the real MANGLO business model and domain.

## Provider catalog sync
Call from a secure server/admin environment only:

```bash
curl -X POST https://YOURDOMAIN/api/services/sync \
  -H "Authorization: Bearer $CRON_SECRET"
```

Never expose this bearer token in client code.

## Build and run

```bash
npm install
npx prisma generate
npm run build
npm start
```

After adding or changing dependencies, commit the refreshed `package-lock.json` from a trusted development machine before freezing a production release.

## Required business details before launch
Add the real information for:
- Legal business/entity name
- Registered/business address
- Support email
- Customer-care phone
- Actual support hours
- GSTIN/CIN if applicable
- Policy effective dates
- Refund/cancellation terms consistent with the upstream supplier, Cashfree requirements and applicable Indian law

## Production security checklist
- HTTPS only
- Hostinger/admin/Supabase accounts protected with MFA
- Email verification enabled
- Password recovery tested end to end
- Supabase Auth rate limits reviewed
- CAPTCHA/bot protection enabled before high-volume public signup
- `supabase/production-hardening.sql` applied
- Data API disabled for business tables if not needed
- Database backups / point-in-time recovery plan verified
- Cashfree webhook signature and server-side status verification tested
- Provider and Cashfree keys rotated immediately if exposed
- Cloudflare/WAF and distributed rate limiting added before meaningful scale
- Admin RBAC added before exposing any operational dashboard
- Security logs must never contain passwords, API keys or payment secrets
- Automated dependency/security scanning enabled in CI before main is released

## Important
Third-party social platforms have their own rules. Do not market MANGLO with promises such as guaranteed virality, guaranteed account safety, or “ban proof” claims unless they can be substantiated and comply with the relevant platform rules.
