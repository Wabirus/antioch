-- CreateEnum
CREATE TYPE "StreamStatus" AS ENUM ('offline', 'live', 'scheduled');

-- CreateTable
CREATE TABLE "Stream" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "youtubeUrl" TEXT,
    "facebookUrl" TEXT,
    "tiktokUrl" TEXT,
    "embedUrl" TEXT NOT NULL,
    "status" "StreamStatus" NOT NULL DEFAULT 'offline',
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "scheduledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stream_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Stream_status_isActive_idx" ON "Stream"("status", "isActive");

-- CreateIndex
CREATE INDEX "Stream_updatedAt_idx" ON "Stream"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Stream_single_active_idx" ON "Stream"("isActive") WHERE "isActive" = true;
