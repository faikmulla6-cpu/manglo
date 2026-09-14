DROP INDEX IF EXISTS "MetaAdsWindsorDaily_account_id_ad_id_date_key";
CREATE INDEX IF NOT EXISTS "MetaAdsWindsorDaily_account_id_ad_id_date_idx" ON "MetaAdsWindsorDaily"("account_id", "ad_id", "date");
