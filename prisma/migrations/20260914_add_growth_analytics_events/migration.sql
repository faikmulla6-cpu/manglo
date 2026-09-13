ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "analyticsLinkedAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "AnalyticsEvent" (
  "id" TEXT NOT NULL,
  "userId" UUID,
  "anonymousId" TEXT,
  "sessionId" TEXT,
  "event" TEXT NOT NULL,
  "path" TEXT,
  "source" TEXT,
  "medium" TEXT,
  "campaign" TEXT,
  "content" TEXT,
  "term" TEXT,
  "referrerHost" TEXT,
  "metadata" JSONB,
  "uniqueKey" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AnalyticsEvent_pkey" PRIMARY KEY ("id")
);

DO $$ BEGIN
  ALTER TABLE "AnalyticsEvent" ADD CONSTRAINT "AnalyticsEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "AnalyticsEvent_uniqueKey_key" ON "AnalyticsEvent"("uniqueKey");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_event_createdAt_idx" ON "AnalyticsEvent"("event", "createdAt");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_userId_createdAt_idx" ON "AnalyticsEvent"("userId", "createdAt");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_sessionId_createdAt_idx" ON "AnalyticsEvent"("sessionId", "createdAt");
CREATE INDEX IF NOT EXISTS "AnalyticsEvent_source_campaign_createdAt_idx" ON "AnalyticsEvent"("source", "campaign", "createdAt");
