import { Sale } from '@prisma/client'
import { SalesRepository, UpdateSale } from '@/repositories/sales-repository'
import { PropertyNotExistsError } from './errors/property-not-exists-error'

interface UpdatePropertyUseCaseRequest {
  id: string
  data: UpdateSale
}

export class UpdateSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({ id, data }: UpdatePropertyUseCaseRequest): Promise<Sale> {
    const saleExists = await this.salesRepository.findById(id)

    if (!saleExists) {
      throw new PropertyNotExistsError()
    }

    const salesUsers = data?.users?.map((user) => ({
      sale_id_user_id: {
        sale_id: id,
        user_id: user.user_id,
      }
    }))

    const saleClients = data?.clients?.map((client) => ({
      sale_id_client_id: {
        sale_id: id,
        client_id: client.client_id,
      }
    }))

    const updatedSale = await this.salesRepository.update(id, {
      ...data,
      users: salesUsers ? { set: salesUsers } : undefined,
      clients: saleClients ? { set: saleClients } : undefined,
    })

    return updatedSale
  }
}