# MANGLO production maintenance

All maintenance endpoints require the server-side `CRON_SECRET` as an `Authorization: Bearer ...` header. Never expose the secret in browser code or public URLs.

## Scheduled jobs

### 1. Order reconciliation
- Method: `POST`
- URL: `https://manglo.shop/api/orders/reconcile`
- Recommended cadence: every 2 minutes
- Purpose: refreshes supplier-linked QUEUED/PROCESSING orders and applies idempotent completion/refund outcomes.

### 2. Payment reconciliation
- Method: `POST`
- URL: `https://manglo.shop/api/payments/reconcile`
- Recommended cadence: every 5 minutes
- Purpose: re-checks older CREATED/PENDING Cashfree orders. Wallet credit still happens only after Cashfree verifies the order as PAID. Attempt-level states are used only to classify stale failed/user-dropped attempts.

### 3. Catalog synchronization
- Method: `POST`
- URL: `https://manglo.shop/api/services/sync`
- Recommended cadence: every 6 hours
- Purpose: refreshes provider rates, limits, refill/cancel flags and availability for the locked curated service catalog.
- Safety: rejects suspiciously small supplier responses and large curated-baseline mismatches before writing.

### 4. Operations health check
- Method: `POST`
- URL: `https://manglo.shop/api/operations/check`
- Recommended cadence: every 15 minutes
- Purpose: returns HTTP 503 when configured operational thresholds are breached so the scheduler can alert the owner.
- Checks: supplier API/balance, catalog freshness, stale payments, stale active orders.

## Recommended cron-job.org behavior
- Add header: `Authorization: Bearer <CRON_SECRET>`
- Enable job on creation.
- Enable failure notifications for the operations health check.
- Do not save full response history if it may retain operational data longer than needed.
- Never place `CRON_SECRET` in the query string.

## Threshold environment variables
- `PAYMENT_RECONCILE_MIN_AGE_MINUTES=5`
- `PAYMENT_STALE_MINUTES=30`
- `ORDER_STALE_HOURS=24`
- `CATALOG_STALE_HOURS=24`
- `SMM_LOW_BALANCE_THRESHOLD_INR=` — set to the minimum supplier balance you want to maintain.

## Safety rules
- Never manually credit a wallet because a customer says they paid. Reconcile against Cashfree.
- Never retry supplier order creation blindly after an uncertain response; first inspect MANGLO and provider state.
- Keep `SMM_IMPORT_NEW_SERVICES=false` until new supplier IDs have been reviewed.
- Operations console is observational by default; financial mutation remains in the existing audited transaction paths.
