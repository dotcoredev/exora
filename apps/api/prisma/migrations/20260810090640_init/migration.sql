-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "iso_code" VARCHAR(3) NOT NULL,
    "iso_numeric" VARCHAR(3) NOT NULL,
    "name" TEXT NOT NULL,
    "ru" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_iso_code_key" ON "currencies"("iso_code");
