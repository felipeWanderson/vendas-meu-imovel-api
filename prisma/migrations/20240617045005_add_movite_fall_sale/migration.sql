-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "fall_motive" TEXT,
ALTER COLUMN "pay_date_act" DROP NOT NULL,
ALTER COLUMN "negotiation" DROP NOT NULL;
