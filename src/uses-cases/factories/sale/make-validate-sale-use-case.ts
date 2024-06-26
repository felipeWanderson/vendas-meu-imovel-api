import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository"
import { ValidateSaleUseCase } from "@/uses-cases/validate-sale"


export function makeValidateSaleUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const validateSaleUseCase = new ValidateSaleUseCase(salesRepository)

  return validateSaleUseCase
}