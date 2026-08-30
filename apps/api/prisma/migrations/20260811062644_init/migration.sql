-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "iso_code" VARCHAR(3) NOT NULL,
    "iso_numeric" VARCHAR(3),
    "name" TEXT NOT NULL,
    "ru" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "start_date" DATE NOT NULL,

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rate_history" (
    "id" TEXT NOT NULL,
    "base" VARCHAR(3) NOT NULL,
    "quote" VARCHAR(3) NOT NULL,
    "rate" DECIMAL(65,30) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "rate_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "currencies_iso_code_key" ON "currencies"("iso_code");

-- CreateIndex
CREATE INDEX "rate_history_base_quote_date_idx" ON "rate_history"("base", "quote", "date");

-- CreateIndex
CREATE UNIQUE INDEX "rate_history_base_quote_date_key" ON "rate_history"("base", "quote", "date");
