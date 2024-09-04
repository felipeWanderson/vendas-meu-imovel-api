import { SalesRepository, QueriesSales } from '@/repositories/sales-repository'
import { Sale } from '@prisma/client'

interface SearchSalesUseCaseRequest {
  query: QueriesSales
  page: number
  perPage?: number
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
    perPage = 10
  }: SearchSalesUseCaseRequest): Promise<SearchSalesUseCaseResponse> {
    const {sales, total} = await this.salesRepository.findMany(query, page, perPage)
    return { sales, total} 
  }
}
