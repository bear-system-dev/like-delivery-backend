-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CONSUMER', 'MERCHANT');

-- CreateEnum
CREATE TYPE "MerchantRole" AS ENUM ('OWNER', 'ADMIN');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "merchantRole" "MerchantRole" NOT NULL DEFAULT 'OWNER',
ADD COLUMN     "userRole" "UserRole" NOT NULL DEFAULT 'MERCHANT';
