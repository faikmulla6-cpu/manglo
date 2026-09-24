CREATE TYPE "AgencyLeadStatus" AS ENUM ('NEW', 'CONTACTED', 'QUALIFIED', 'WON', 'CLOSED');

CREATE TABLE "AgencyInquiry" (
  "id" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "company" TEXT,
  "website" TEXT,
  "service" TEXT NOT NULL,
  "budget" TEXT,
  "timeline" TEXT,
  "projectType" TEXT,
  "message" TEXT NOT NULL,
  "status" "AgencyLeadStatus" NOT NULL DEFAULT 'NEW',
  "source" TEXT NOT NULL DEFAULT 'website',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AgencyInquiry_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AgencyInquiry_reference_key" ON "AgencyInquiry"("reference");
CREATE INDEX "AgencyInquiry_status_createdAt_idx" ON "AgencyInquiry"("status", "createdAt");
CREATE INDEX "AgencyInquiry_email_createdAt_idx" ON "AgencyInquiry"("email", "createdAt");

ALTER TABLE "AgencyInquiry" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE "AgencyInquiry" FROM anon, authenticated;
