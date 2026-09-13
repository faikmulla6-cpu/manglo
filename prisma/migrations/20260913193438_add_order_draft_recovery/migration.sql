CREATE TABLE "OrderDraft" (
  "id" TEXT NOT NULL,
  "userId" UUID NOT NULL,
  "serviceId" TEXT NOT NULL,
  "quantity" INTEGER NOT NULL,
  "link" TEXT NOT NULL,
  "recoveryOpenedAt" TIMESTAMP(3),
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "OrderDraft_pkey" PRIMARY KEY ("id"),
  CONSTRAINT "OrderDraft_quantity_check" CHECK ("quantity" > 0)
);

CREATE UNIQUE INDEX "OrderDraft_userId_key" ON "OrderDraft"("userId");
CREATE INDEX "OrderDraft_expiresAt_idx" ON "OrderDraft"("expiresAt");
CREATE INDEX "OrderDraft_serviceId_idx" ON "OrderDraft"("serviceId");

ALTER TABLE "OrderDraft" ADD CONSTRAINT "OrderDraft_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderDraft" ADD CONSTRAINT "OrderDraft_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrderDraft" ENABLE ROW LEVEL SECURITY;

-- Drafts are accessed through MANGLO's authenticated server/Prisma path, not browser-side table access.
-- Production also removes anon/authenticated table grants as defense in depth.