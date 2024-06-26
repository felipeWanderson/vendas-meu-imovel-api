import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository"
import { GetSaleByIdUseCase } from "@/uses-cases/get-sale"


export function makeGetSaleByIdUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const getSaleByIdUseCase = new GetSaleByIdUseCase(salesRepository)

  return getSaleByIdUseCase
}