import { PrismaSalesRepository } from '@/repositories/prisma/prisma-sales-repository'
import { SearchSaleUseCase } from '@/uses-cases/search-sale'

export function makeSearchSalesUseCase() {
  const salesRepository = new PrismaSalesRepository()
  const searchSalesUseCase = new SearchSaleUseCase(salesRepository)

  return searchSalesUseCase
}
