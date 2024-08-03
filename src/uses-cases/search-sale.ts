import { SalesRepository, QueriesSales } from '@/repositories/sales-repository'
import { Sale } from '@prisma/client'

interface SearchSalesUseCaseRequest {
  query: QueriesSales
  page: number
}

interface SearchSalesUseCaseResponse {
  sales: Sale[];
  total: number
}

export class SearchSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({
    query,
    page = 1,
  }: SearchSalesUseCaseRequest): Promise<SearchSalesUseCaseResponse> {
    const {sales, total} = await this.salesRepository.findMany(query, page)
    return { sales, total} 
  }
}
