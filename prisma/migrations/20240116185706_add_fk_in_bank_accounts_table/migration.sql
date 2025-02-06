/*
  Warnings:

  - Added the required column `color` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `bank_accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "bank_account_type" AS ENUM ('CHECKING', 'INVESTMENT', 'CASH');

-- AlterTable
ALTER TABLE "bank_accounts" ADD COLUMN     "color" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" "bank_account_type" NOT NULL;

-- DropEnum
DROP TYPE "BankAccountType";

-- AddForeignKey
ALTER TABLE "bank_accounts" ADD CONSTRAINT "bank_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
