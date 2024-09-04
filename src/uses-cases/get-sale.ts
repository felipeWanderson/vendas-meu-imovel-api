import { Sale } from '@prisma/client'
import { SalesRepository } from '@/repositories/sales-repository'
import { SaleNotExistsError } from './errors/sales-not-exists'

interface GetSaleByIdUseCaseRequest {
  id: string
}

export class GetSaleByIdUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ id }: GetSaleByIdUseCaseRequest): Promise<Sale> {
    const sale = await this.salesRepository.findById(id)

    if (!sale) {
      throw new SaleNotExistsError()
    }

    return sale
  }
}