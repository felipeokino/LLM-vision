-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('GAS', 'WATER');

-- CreateTable
CREATE TABLE "Measure" (
    "uuid" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" "MeasureType" NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("uuid")
);
