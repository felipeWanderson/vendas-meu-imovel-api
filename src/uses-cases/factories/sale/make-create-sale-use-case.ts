import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { CreateSaleUseCase } from '@/uses-cases/create-sale'

export function makeCreateSaleUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const createSaleUseCase = new CreateSaleUseCase(salesRepository)

  return createSaleUseCase
}
