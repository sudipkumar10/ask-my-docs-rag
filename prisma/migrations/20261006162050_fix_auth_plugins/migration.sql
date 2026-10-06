/*
  Warnings:

  - A unique constraint covering the columns `[credentialID]` on the table `passkey` will be added. If there are existing duplicate values, this will fail.
  - Made the column `createdAt` on table `passkey` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "passkey_credentialID_idx";

-- AlterTable
ALTER TABLE "apikey" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "member" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "passkey" ALTER COLUMN "counter" SET DEFAULT 0,
ALTER COLUMN "backedUp" SET DEFAULT false,
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "passkey_credentialID_key" ON "passkey"("credentialID");
