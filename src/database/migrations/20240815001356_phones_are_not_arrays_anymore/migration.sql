/*
  Warnings:

  - You are about to drop the column `phones` on the `users` table. All the data in the column will be lost.
  - Added the required column `phoneNumberFirst` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "phones",
ADD COLUMN     "phoneNumberFirst" TEXT NOT NULL,
ADD COLUMN     "phoneNumberSecond" TEXT,
ADD COLUMN     "phoneNumberThird" TEXT;
