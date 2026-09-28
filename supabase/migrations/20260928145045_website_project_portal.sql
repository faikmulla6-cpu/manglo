CREATE TYPE "WebsiteProjectStatus" AS ENUM (
  'DRAFT',
  'INFORMATION_RECEIVED',
  'DESIGN_DEVELOPMENT',
  'CLIENT_REVIEW',
  'FINAL_CHANGES',
  'READY_TO_LAUNCH',
  'LIVE'
);

CREATE TYPE "WebsiteProjectAssetKind" AS ENUM (
  'LOGO',
  'BUSINESS_PHOTO',
  'WORK_PHOTO',
  'DOCUMENT'
);

CREATE TABLE "WebsiteProject" (
  "id" TEXT NOT NULL,
  "publicId" TEXT NOT NULL,
  "userId" UUID NOT NULL,
  "businessName" TEXT,
  "contactPerson" TEXT,
  "category" TEXT,
  "description" TEXT,
  "phone" TEXT,
  "whatsapp" TEXT,
  "businessEmail" TEXT,
  "existingWebsite" TEXT,
  "instagram" TEXT,
  "facebook" TEXT,
  "socialLinks" JSONB,
  "address" TEXT,
  "city" TEXT,
  "region" TEXT,
  "country" TEXT,
  "mapsUrl" TEXT,
  "noCustomerFacingLocation" BOOLEAN NOT NULL DEFAULT false,
  "openingDays" JSONB,
  "openingTime" TEXT,
  "closingTime" TEXT,
  "services" JSONB,
  "pricingNotes" TEXT,
  "primaryCta" TEXT,
  "about" TEXT,
  "mustInclude" TEXT,
  "mustAvoid" TEXT,
  "preferredColors" TEXT,
  "preferredStyle" TEXT,
  "inspirationSites" JSONB,
  "testimonials" JSONB,
  "googleBusinessProfile" TEXT,
  "existingDomain" TEXT,
  "domainProvider" TEXT,
  "additionalInstructions" TEXT,
  "currentStep" INTEGER NOT NULL DEFAULT 1,
  "status" "WebsiteProjectStatus" NOT NULL DEFAULT 'DRAFT',
  "submittedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "WebsiteProject_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WebsiteProjectAsset" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "kind" "WebsiteProjectAssetKind" NOT NULL,
  "bucket" TEXT NOT NULL DEFAULT 'website-project-assets',
  "path" TEXT NOT NULL,
  "originalName" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WebsiteProjectAsset_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "WebsiteProjectTeamAccess" (
  "id" TEXT NOT NULL,
  "userId" UUID NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "WebsiteProjectTeamAccess_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "WebsiteProject_publicId_key" ON "WebsiteProject"("publicId");
CREATE INDEX "WebsiteProject_userId_createdAt_idx" ON "WebsiteProject"("userId", "createdAt");
CREATE INDEX "WebsiteProject_status_updatedAt_idx" ON "WebsiteProject"("status", "updatedAt");

CREATE UNIQUE INDEX "WebsiteProjectAsset_path_key" ON "WebsiteProjectAsset"("path");
CREATE INDEX "WebsiteProjectAsset_projectId_kind_createdAt_idx" ON "WebsiteProjectAsset"("projectId", "kind", "createdAt");

CREATE UNIQUE INDEX "WebsiteProjectTeamAccess_userId_key" ON "WebsiteProjectTeamAccess"("userId");

ALTER TABLE "WebsiteProject"
  ADD CONSTRAINT "WebsiteProject_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WebsiteProjectAsset"
  ADD CONSTRAINT "WebsiteProjectAsset_projectId_fkey"
  FOREIGN KEY ("projectId") REFERENCES "WebsiteProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WebsiteProjectTeamAccess"
  ADD CONSTRAINT "WebsiteProjectTeamAccess_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "WebsiteProject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WebsiteProjectAsset" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "WebsiteProjectTeamAccess" ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE "WebsiteProject" FROM anon, authenticated;
REVOKE ALL ON TABLE "WebsiteProjectAsset" FROM anon, authenticated;
REVOKE ALL ON TABLE "WebsiteProjectTeamAccess" FROM anon, authenticated;
GRANT SELECT ON TABLE "WebsiteProjectTeamAccess" TO authenticated;

CREATE POLICY "website_project_team_self_read"
ON "WebsiteProjectTeamAccess"
FOR SELECT
TO authenticated
USING ("userId" = (SELECT auth.uid()));

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'website-project-assets',
  'website-project-assets',
  false,
  6291456,
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'application/pdf'
  ]
)
ON CONFLICT (id) DO UPDATE
SET
  name = EXCLUDED.name,
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

CREATE POLICY "website_project_assets_owner_insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'website-project-assets'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
);

CREATE POLICY "website_project_assets_owner_or_team_read"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'website-project-assets'
  AND (
    (storage.foldername(name))[1] = (SELECT auth.uid())::text
    OR EXISTS (
      SELECT 1
      FROM public."WebsiteProjectTeamAccess" team
      WHERE team."userId" = (SELECT auth.uid())
    )
  )
);

CREATE POLICY "website_project_assets_owner_delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'website-project-assets'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
);
