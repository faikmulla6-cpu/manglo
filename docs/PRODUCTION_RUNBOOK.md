# MANGLO production runbook

This is the operational release checklist for the `manglo-dev` release candidate. Never merge or deploy a release that fails the gates below.

## Release gates

- Hostinger deploy completes `npm ci`, `prisma generate`, migrations, and `next build` without errors.
- `GET /api/health` returns HTTP 200 with `{ "ok": true, "status": "ready" }`.
- Supabase Auth leaked-password protection is enabled and the owner/admin account uses MFA where available.
- Real legal/business contact information is configured for the public policy/contact pages.
- Cashfree production webhook is registered at `/api/payments/webhook` and a small real top-up succeeds end to end.
- Supplier catalog has synced successfully within the last 24 hours. Ordering fails closed when catalog data is older than `CATALOG_ORDER_MAX_AGE_HOURS`.
- No uncertain supplier submissions remain in `/admin/submissions`.
- Production database integrity checks are clean: no negative wallet, no wallet/ledger mismatch, no paid payment without deposit ledger, no order without debit ledger.

## Required scheduled jobs

Use the same strong `CRON_SECRET` (minimum 32 random characters/bytes) in Hostinger and send it as `Authorization: Bearer ...`. Never put it in browser code.

| Endpoint | Recommended cadence | Purpose |
| --- | --- | --- |
| `POST /api/payments/reconcile` | every 5 minutes | Reconcile delayed Cashfree payments and safely credit paid deposits |
| `POST /api/orders/reconcile` | every 5 minutes | Refresh active supplier order states and issue idempotent eligible refunds |
| `POST /api/services/sync` | every 60 minutes | Refresh supplier services, pricing and limits |
| `POST /api/operations/check` | every 15 minutes | Detect stale payments/orders/catalog, uncertain submissions, supplier problems, and delete expired drafts |

Treat any non-2xx result from operations checks as an alert. Do not ignore `UNCERTAIN_SUPPLIER_SUBMISSIONS`, `CATALOG_SYNC_STALE`, `STALE_PAYMENTS`, `STALE_ORDERS`, or `SUPPLIER_API_UNAVAILABLE`.

## Uncertain supplier submission procedure

A supplier timeout after MANGLO debits the wallet is intentionally **not** retried automatically because the supplier may already have accepted the original request. Open `/admin/submissions`, locate the order in the supplier dashboard using service, destination and quantity, then choose exactly one action:

- If the supplier order exists, copy its supplier order ID into MANGLO and attach it. MANGLO resumes normal status reconciliation.
- If the supplier order definitely does not exist, issue the audited wallet refund.

Never attach an unverified supplier order ID and never refund solely because the original HTTP request timed out.

## Payment incident procedure

For a customer who says money left their bank but wallet was not credited, do not manually increase wallet balance first. Run/allow Cashfree reconciliation using the existing Cashfree order reference. MANGLO verifies currency and exact amount server-side and the deposit ledger uses an idempotency key, so duplicate callbacks/retries cannot legitimately double-credit the same payment.

## Database / migrations

Production schema changes must be committed under `prisma/migrations` and applied with `prisma migrate deploy` (or the controlled Supabase migration tool used by operations). Do not use `prisma db push` against production.

All business tables are server-only: RLS is enabled and browser `anon` / `authenticated` table grants are revoked. Do not add client-side direct Supabase queries for wallet, payment, order, support, analytics, referral or AI-conversation business tables without a deliberate authorization design review.

## Secrets

Server-only values include database credentials, `CRON_SECRET`, Cashfree secrets, supplier API key and Groq API key. Do not prefix any of these with `NEXT_PUBLIC_`. Rotate a secret immediately if it is exposed in logs, screenshots, chat, source control or client bundles.

## Smoke test after every production deployment

1. Open `/api/health`; require HTTP 200.
2. Sign in with a non-admin test customer and verify dashboard access.
3. Confirm `/services` shows only freshly synced live services.
4. Make a small wallet top-up and verify one deposit ledger entry and the correct balance.
5. Place the smallest safe test order, verify one debit ledger entry, supplier order ID attachment, status tracking and margin capture.
6. Open `/admin`, `/admin/submissions`, and Support; confirm private pages are inaccessible from a non-admin account.
7. Run each cron endpoint once with the real bearer secret and confirm expected 2xx responses.
8. Check Supabase security/performance advisors and GitHub Production readiness CI.

## Rollback rule

If money movement, wallet integrity, authentication, supplier submission or database migration behavior is uncertain after deployment, stop new ordering first. Prefer returning a 503 / hiding stale services over accepting orders into an unknown state. Restore ordering only after the invariant or upstream dependency is verified.
