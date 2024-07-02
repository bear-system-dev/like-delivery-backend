-- DropIndex
DROP INDEX "users_email_fantasyName_idx";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "active" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT false;

-- CreateIndex
CREATE INDEX "users_email_fantasyName_CPF_CNPJ_idx" ON "users"("email", "fantasyName", "CPF", "CNPJ");
