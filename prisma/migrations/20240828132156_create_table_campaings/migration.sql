-- CreateEnum
CREATE TYPE "Category" AS ENUM ('POLITICAL', 'SOCIAL', 'ECONOMIC', 'ENVIRONMENTAL');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVED', 'PAUSED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Campaigns" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL,
    "category" "Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);
