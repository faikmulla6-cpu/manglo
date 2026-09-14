CREATE TABLE "MetaAdsWindsorDaily" (
  "id" UUID NOT NULL DEFAULT gen_random_uuid(),
  "date" DATE NOT NULL,
  "account_id" TEXT NOT NULL,
  "campaign" TEXT NOT NULL,
  "campaign_id" TEXT NOT NULL,
  "ad_id" TEXT NOT NULL,
  "ad_name" TEXT,
  "spend" DECIMAL(18,4) NOT NULL DEFAULT 0,
  "impressions" BIGINT NOT NULL DEFAULT 0,
  "clicks" BIGINT NOT NULL DEFAULT 0,
  "currency" TEXT,
  "url_tags" TEXT,
  "data_fetched_at" TIMESTAMP(3),
  "imported_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "MetaAdsWindsorDaily_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "MetaAdsWindsorDaily_account_id_ad_id_date_key" ON "MetaAdsWindsorDaily"("account_id", "ad_id", "date");
CREATE INDEX "MetaAdsWindsorDaily_date_idx" ON "MetaAdsWindsorDaily"("date");
CREATE INDEX "MetaAdsWindsorDaily_campaign_id_date_idx" ON "MetaAdsWindsorDaily"("campaign_id", "date");

ALTER TABLE "MetaAdsWindsorDaily" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "MetaAdsWindsorDaily" FROM anon, authenticated;
