-- MANGLO production hardening for Supabase Postgres.
-- Run AFTER Prisma has created the business tables.
-- MANGLO accesses these tables only through its server-side Prisma connection.
-- The browser-facing Supabase Data API should have no direct access to wallet,
-- payment, order, provider, support or account-profile tables.

begin;

alter table public."User" enable row level security;
alter table public."Payment" enable row level security;
alter table public."Service" enable row level security;
alter table public."Favorite" enable row level security;
alter table public."SupportTicket" enable row level security;
alter table public."Order" enable row level security;
alter table public."WalletLedger" enable row level security;
alter table public."AgencyInquiry" enable row level security;

revoke all on table public."User" from anon, authenticated;
revoke all on table public."Payment" from anon, authenticated;
revoke all on table public."Service" from anon, authenticated;
revoke all on table public."Favorite" from anon, authenticated;
revoke all on table public."SupportTicket" from anon, authenticated;
revoke all on table public."Order" from anon, authenticated;
revoke all on table public."WalletLedger" from anon, authenticated;
revoke all on table public."AgencyInquiry" from anon, authenticated;

commit;

-- Defense in depth: if MANGLO continues to use Prisma exclusively for business data,
-- disable the Supabase Data API for the public schema from the Supabase dashboard.
