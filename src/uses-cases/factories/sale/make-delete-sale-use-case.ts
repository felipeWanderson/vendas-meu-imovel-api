import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository"
import { DeleteSaleUseCase } from "@/uses-cases/delete-sale"

export function makeDeleteSaleUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const deleteSaleUseCase = new DeleteSaleUseCase(salesRepository)

  return deleteSaleUseCase
}