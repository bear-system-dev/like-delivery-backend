/*
  Warnings:

  - You are about to drop the column `complements` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "complements",
ADD COLUMN     "complement" TEXT;
