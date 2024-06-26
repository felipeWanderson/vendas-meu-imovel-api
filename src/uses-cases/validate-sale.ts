import { Sale, SalesRepository } from "@/repositories/sales-repository"
import { InvalidSaleStatusError } from "@/uses-cases/errors/invalid-status-sale"
import { MissingPayDateActError } from "@/uses-cases/errors/missing-pay-date-act"
import { SaleNotExistsError } from "@/uses-cases/errors/sales-not-exists"
import { StatusSale } from "@prisma/client"
import { format, parseISO } from "date-fns"


interface ValidateSaleUseCaseRequest {
  id: string
  pay_date_act?: string
}

export class ValidateSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ id, pay_date_act }: ValidateSaleUseCaseRequest): Promise<Sale> {
    const sale = await this.salesRepository.findById(id)

    if (!sale) {
      throw new SaleNotExistsError()
    }

    if (sale.status !== StatusSale.SUBIMITTED) {
      throw new InvalidSaleStatusError(sale.status)
    }

    if (!sale.pay_date_act && !pay_date_act) {
      throw new MissingPayDateActError()
    }

    const updatedSale = await this.salesRepository.update(id, {
      status: StatusSale.VALIDATED,
      pay_date_act: pay_date_act ? format(parseISO(pay_date_act), "yyyy-MM-dd'T'HH:mm:ssXXX") : sale.pay_date_act,
    })

    return updatedSale
  }
}