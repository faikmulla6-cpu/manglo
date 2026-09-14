CREATE TABLE "MarketingSpendDaily" (
  "id" TEXT NOT NULL,
  "source" TEXT NOT NULL,
  "campaign" TEXT NOT NULL,
  "date" DATE NOT NULL,
  "spendPaise" BIGINT NOT NULL,
  "impressions" BIGINT NOT NULL DEFAULT 0,
  "clicks" BIGINT NOT NULL DEFAULT 0,
  "currency" TEXT NOT NULL DEFAULT 'INR',
  "externalCampaignId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "MarketingSpendDaily_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "MarketingSpendDaily_spend_check" CHECK ("spendPaise" >= 0),
  CONSTRAINT "MarketingSpendDaily_impressions_check" CHECK ("impressions" >= 0),
  CONSTRAINT "MarketingSpendDaily_clicks_check" CHECK ("clicks" >= 0)
);

CREATE UNIQUE INDEX "MarketingSpendDaily_source_campaign_date_key" ON "MarketingSpendDaily"("source", "campaign", "date");
CREATE INDEX "MarketingSpendDaily_date_idx" ON "MarketingSpendDaily"("date");
CREATE INDEX "MarketingSpendDaily_source_campaign_date_idx" ON "MarketingSpendDaily"("source", "campaign", "date");

ALTER TABLE "MarketingSpendDaily" ENABLE ROW LEVEL SECURITY;
