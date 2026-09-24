CREATE TABLE "AgencyInquiry" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "company" TEXT,
    "currentWebsite" TEXT,
    "service" TEXT NOT NULL,
    "budget" TEXT,
    "timeline" TEXT,
    "message" TEXT NOT NULL,
    "source" TEXT NOT NULL DEFAULT 'website',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AgencyInquiry_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AgencyInquiry_createdAt_idx" ON "AgencyInquiry"("createdAt");
CREATE INDEX "AgencyInquiry_email_createdAt_idx" ON "AgencyInquiry"("email", "createdAt");
