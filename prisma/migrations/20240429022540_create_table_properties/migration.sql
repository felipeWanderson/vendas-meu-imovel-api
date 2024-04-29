/*
  Warnings:

  - You are about to drop the column `builder_id` on the `sales` table. All the data in the column will be lost.
  - You are about to drop the column `immobile` on the `sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_builder_id_fkey";

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "builder_id",
DROP COLUMN "immobile",
ADD COLUMN     "plant_property_id" TEXT,
ADD COLUMN     "single_property" TEXT;

-- CreateTable
CREATE TABLE "properties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" JSONB NOT NULL,
    "builder_id" TEXT,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "properties" ADD CONSTRAINT "properties_builder_id_fkey" FOREIGN KEY ("builder_id") REFERENCES "builders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_plant_property_id_fkey" FOREIGN KEY ("plant_property_id") REFERENCES "properties"("id") ON DELETE SET NULL ON UPDATE CASCADE;
