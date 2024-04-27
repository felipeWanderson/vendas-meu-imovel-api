import {
  Client,
  Sale,
  SalesRepository,
  User,
} from '@/repositories/sales-repository'
import { Prisma } from '@prisma/client'

interface CreateSaleCaseRequest {
  immobile: string
  unity: string
  amount: bigint | number
  date_sale: Date | string
  act: bigint | number
  pay_date_act: Date | string
  negotiation: Prisma.InputJsonValue
  users: User[]
  clients: Client[]
  builder?: string
}

interface CreateSaleCaseResponse {
  sale: Sale
}

export class CreateSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute({
    immobile,
    act,
    amount,
    date_sale,
    negotiation,
    pay_date_act,
    unity,
    clients,
    users,
    builder,
  }: CreateSaleCaseRequest): Promise<CreateSaleCaseResponse> {
    const salesUsers = users.map((user) => {
      return {
        role: user.role,
        user_id: user.user_id,
      }
    })
    const saleClients = clients.map((client) => {
      return {
        role: client.role,
        client_id: client.client_id,
      }
    })

    const sale = await this.salesRepository.create({
      status: 'SUBIMITTED',
      immobile,
      act,
      amount,
      date_sale,
      negotiation,
      pay_date_act,
      unity,
      builder_id: builder,
      users: {
        create: salesUsers,
      },
      clients: {
        create: saleClients,
      },
    })

    return {
      sale,
    }
  }
}
