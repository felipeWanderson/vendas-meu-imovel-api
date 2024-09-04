import { Sale, SalesRepository } from "@/repositories/sales-repository"
import { InvalidSaleStatusError } from "@/uses-cases/errors/invalid-status-sale"
import { SaleNotExistsError } from "@/uses-cases/errors/sales-not-exists"
import { StatusSale } from "@prisma/client"


interface ValidateSaleUseCaseRequest {
  id: string
}

export class ValidateSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ id }: ValidateSaleUseCaseRequest): Promise<Sale> {
    const sale = await this.salesRepository.findById(id)

    if (!sale) {
      throw new SaleNotExistsError()
    }

    if (sale.status !== StatusSale.SUBIMITTED) {
      throw new InvalidSaleStatusError(sale.status)
    }


    const updatedSale = await this.salesRepository.update(id, {
      status: StatusSale.VALIDATED,
    })

    return updatedSale
  }
}