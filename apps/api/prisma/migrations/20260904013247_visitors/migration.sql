-- CreateTable
CREATE TABLE "visitors" (
    "id" TEXT NOT NULL,
    "host" TEXT,
    "path" TEXT,
    "referer" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    "browser" TEXT,
    "os" TEXT,
    "device" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visitors_createdAt_idx" ON "visitors"("createdAt");
