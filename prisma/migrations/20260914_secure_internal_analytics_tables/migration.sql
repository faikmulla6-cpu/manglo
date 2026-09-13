CREATE INDEX IF NOT EXISTS "AnalyticsEvent_anonymousId_createdAt_idx" ON "AnalyticsEvent"("anonymousId", "createdAt");
ALTER TABLE "AnalyticsEvent" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminAuditLog" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "AnalyticsEvent" FROM anon, authenticated;
REVOKE ALL ON TABLE "AdminAuditLog" FROM anon, authenticated;
