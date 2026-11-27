# Manglo Studio demo requests

The agency lives at `/studio/`. Existing toolkit and Journal routes stay intact.
The form posts JSON to `/api/demo`; the server sends only to **faik@manglo.shop** through Hostinger Mail API. Visitor email, message, business, local availability, timezone, and UTC time are included. This requests a conversation; it does not reserve a calendar slot.

## Hostinger setup

1. Open Emails → manglo.shop → Agentic Mail → API access. Create a named Mail API token scoped to faik@manglo.shop with sending/SMTP access. A Hosting API token is a different credential. Copy the token privately; it is shown once.
2. Website → manglo.shop → Environment variables: add `HOSTINGER_MAIL_API_TOKEN` as a server secret. Set `HOSTINGER_MAILBOX_RESOURCE_ID=AC0e7a966a7f7d8666eab4e0600058` and `MANGLO_PUBLIC_ORIGIN=https://manglo.shop`. Do not use a `VITE_` prefix. Preserve existing variables.
3. Run this as a Node application: Hostinger Express preset, entry `scripts/serve.mjs`, root `./`, Node 22. The Express preset has no build-command field, so production `dist` assets are generated locally with `npm run build` and committed alongside the source. CI validates the build. A static export cannot execute the mail endpoint.
4. Set `NODE_ENV=production`. The default private ledger is `~/.manglo/demo` in production. Verify this home directory persists across Hostinger deployments; otherwise set `MANGLO_DATA_DIR` to a persistent private directory outside public `dist`/public_html. Delivery state must survive restarts to prevent duplicates.
5. Redeploy after changing secrets. Confirm `/api/demo/health` returns `mail_configured:true`. Submit a clearly labelled setup request and verify its reference in the actual inbox. Provider acceptance alone does not prove inbox delivery.

Official references: https://docs.hostinger.com/emails/agentic-mail and https://docs.hostinger.com/emails/mail-api

## Local setup

Run `npm run mail:setup` in an interactive terminal. Paste the Mail API token into the hidden prompt, never chat or a command argument. The script verifies the mailbox before saving. Windows uses current-user DPAPI encryption; other platforms use a private file. `private-data/` is ignored by Git. The local credential is never deployed.

Then run `npm run build`, `npm start`, and `npm run mail:test`. The test sends one labelled notification to faik@manglo.shop. Open http://localhost:4173/studio/. Hosting environment variables take precedence over the local credential. `.env.example` is documentation; the local server does not automatically load `.env` files.

## Delivery behavior

Validation includes email, consent, future local date/time, timezone, and honeypot. HTML escapes visitor content. Recipient and subject are server controlled. Origin checks and per-process email/IP throttling reduce abuse; internet-facing deployments should also use Hostinger/WAF request limits.

Each UUID is claimed atomically before contacting Hostinger. Accepted replays return the same reference without another send. Changed payloads and ambiguous failures require delivery review instead of automatic retries. The private ledger contains contact details; restrict access to the server. Records older than 90 days are removed during request handling.

Missing credentials return an unavailable message with the direct email address. Provider errors return a reference for delivery review. Tokens and provider response bodies are never sent to visitors.
