# MANGLO v1

Production-oriented Next.js marketplace starter for MANGLO.

## What is included
- Orange/white MANGLO consumer UI
- SEO metadata, sitemap, robots and Organization schema
- Registration/login with bcrypt password hashing
- Database-backed hashed session tokens in HttpOnly cookies
- Wallet ledger using integer paise (never floating-point money in DB)
- Cashfree hosted Checkout order creation
- Cashfree webhook HMAC verification + server-side order verification
- Idempotent wallet crediting
- Server-only SMM provider adapter
- Provider service synchronization and retail markup
- Atomic wallet debit before provider submission
- Automatic wallet restoration when provider submission fails
- Order status endpoint
- Terms, Privacy, Refund, Contact and About pages
- Security headers / CSP / HSTS

## Stack
Next.js 15, React 19, TypeScript, Prisma, Supabase Postgres, Cashfree hosted checkout.

## Hostinger deployment
1. Create a Supabase project and copy both its pooled and direct Postgres connection strings.
2. Copy `.env.example` values into Hostinger's environment variable area. **Never commit `.env`**.
3. Set `NEXT_PUBLIC_APP_URL` to the final HTTPS origin, e.g. `https://manglo.in`.
4. Put Cashfree sandbox credentials in `CASHFREE_CLIENT_ID` and `CASHFREE_CLIENT_SECRET`; keep `CASHFREE_MODE=sandbox` until verification is complete.
5. Put the upstream provider secret only in `SMM_API_KEY`.
6. Generate long secrets for `SESSION_PEPPER` and `CRON_SECRET` (at least 32 random bytes each).
7. `npm install`
8. `npx prisma generate`
9. `npx prisma db push` for initial setup; after launch prefer `npx prisma migrate deploy`.
10. `npm run build`
11. `npm start`

## Sync provider catalog
Call from a secure server/admin shell only:

```bash
curl -X POST https://YOURDOMAIN/api/services/sync \
  -H "Authorization: Bearer $CRON_SECRET"
```

Never expose this bearer token in client code.

## Cashfree setup
- Use Cashfree hosted checkout.
- Register `https://YOURDOMAIN/api/payments/webhook` as the notify/webhook endpoint.
- Test success, failure, user-drop, duplicate webhook and delayed webhook scenarios in sandbox.
- Move to production only after Cashfree approves the real MANGLO business model and domain.

## Required business details before launch
The supplied legal/contact copy contains placeholders because company/legal details were not provided. Before production onboarding, add:
- Legal business/entity name
- Registered/business address
- Support email
- Customer-care phone
- Actual support hours
- GSTIN/CIN if applicable
- Effective dates for policies
- Accurate refund/cancellation terms consistent with your upstream supplier and Indian law

## Security launch checklist
- HTTPS only
- Production Cashfree credentials only in Hostinger env
- Rotate keys if ever exposed
- Restrict Hostinger/admin access with 2FA
- Daily DB backups
- Cloudflare or equivalent WAF/rate limiting recommended
- Add email verification and password reset before broad public launch
- Add Redis/distributed rate limiting when scaling beyond one Node instance
- Add admin RBAC; do not expose catalog sync to ordinary users
- Log security events without logging passwords/API keys/payment secrets
- Monitor provider balance and payment webhook failures
- Add automated dependency/security scanning in CI

## Important
Third-party social platforms have their own rules. Do not market MANGLO with promises such as guaranteed virality, guaranteed account safety, or “ban proof” claims unless you can substantiate them and they comply with the relevant platform rules.
