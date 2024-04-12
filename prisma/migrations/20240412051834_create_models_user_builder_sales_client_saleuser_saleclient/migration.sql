-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'REALTOR', 'MANAGER');

-- CreateEnum
CREATE TYPE "StatusSale" AS ENUM ('SUBIMITTED', 'VALIDATED', 'PROCESSING', 'CONCLUDED', 'FAILED');

-- CreateEnum
CREATE TYPE "UserSaleRole" AS ENUM ('SELLER', 'PICKUP', 'MANAGER');

-- CreateEnum
CREATE TYPE "ClientSaleRole" AS ENUM ('SELLER', 'BUYER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "roles" "UserRole"[],
    "is_ranking" BOOLEAN NOT NULL DEFAULT false,
    "password_hash" TEXT NOT NULL,
    "avatar_url" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "builders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,

    CONSTRAINT "builders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "status" "StatusSale" NOT NULL,
    "immobile" TEXT NOT NULL,
    "unity" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "date_sale" TIMESTAMP(3) NOT NULL,
    "act" BIGINT NOT NULL,
    "pay_date_act" TIMESTAMP(3) NOT NULL,
    "negotiation" JSONB NOT NULL,
    "builder_id" TEXT,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sales_users" (
    "user_id" TEXT NOT NULL,
    "sale_id" TEXT NOT NULL,
    "role" "UserSaleRole" NOT NULL,

    CONSTRAINT "sales_users_pkey" PRIMARY KEY ("sale_id","user_id")
);

-- CreateTable
CREATE TABLE "sales_clients" (
    "sale_id" TEXT NOT NULL,
    "role" "ClientSaleRole" NOT NULL,
    "client_id" TEXT NOT NULL,

    CONSTRAINT "sales_clients_pkey" PRIMARY KEY ("sale_id","client_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "builders_document_key" ON "builders"("document");

-- CreateIndex
CREATE UNIQUE INDEX "clients_document_key" ON "clients"("document");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_builder_id_fkey" FOREIGN KEY ("builder_id") REFERENCES "builders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_users" ADD CONSTRAINT "sales_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_users" ADD CONSTRAINT "sales_users_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_clients" ADD CONSTRAINT "sales_clients_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales_clients" ADD CONSTRAINT "sales_clients_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
