import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { UpdateSaleUseCase } from '@/uses-cases/update-sale'

export function makeUpdateSaleUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const updateSaleUseCase = new UpdateSaleUseCase(salesRepository)

  return updateSaleUseCase
}
