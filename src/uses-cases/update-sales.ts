import { Sale } from '@prisma/client'
import { SalesRepository, UpadateSaleInput } from '@/repositories/sales-repository'
import { SaleNotExistsError } from './errors/sale-not-exists-error'

interface UpdateUserUseCaseRequest {
  id: string
  data: UpadateSaleInput
}

export class UpdateSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ id, data }: UpdateUserUseCaseRequest): Promise<Sale> {
    const saleExists = await this.salesRepository.findById(id)

    if (!saleExists) {
      throw new SaleNotExistsError()
    }

    const updateUser = await this.salesRepository.update(id, data)

    return updateUser
  }
}
