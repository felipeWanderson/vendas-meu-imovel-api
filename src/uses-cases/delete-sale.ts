import { Sale } from '@prisma/client'
import { SalesRepository } from '@/repositories/sales-repository'
import { SaleNotExistsError } from './errors/sales-not-exists'

interface DeleteSaleUseCaseRequest {
  id: string
  fall_motive: string
}

export class DeleteSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ id, fall_motive }: DeleteSaleUseCaseRequest): Promise<Sale> {
    const saleExists = await this.salesRepository.findById(id)

    if (!saleExists) {
      throw new SaleNotExistsError()
    }

    const updatedSale = await this.salesRepository.update(id, {
      status: 'FAILED',
      fall_motive,
    })

    return updatedSale
  }
}