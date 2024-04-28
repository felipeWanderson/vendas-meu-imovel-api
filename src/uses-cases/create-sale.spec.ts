import { expect, describe, it, beforeEach } from 'vitest'
import { InMemorySalesRepository } from '@/repositories/in-memory/in-memory-sales-repository'
import { CreateSaleUseCase } from './create-sale'
import { randomUUID } from 'crypto'

let salesRepository: InMemorySalesRepository
let sut: CreateSaleUseCase

describe('Create Sale Use Case', () => {
  beforeEach(() => {
    salesRepository = new InMemorySalesRepository()
    sut = new CreateSaleUseCase(salesRepository)
  })
  it('should to register create sale', async () => {
    const { sale } = await sut.execute({
      immobile: 'Apartamento 1',
      unity: 'Bloco B',
      date_sale: new Date(),
      amount: 150000 * 1000,
      act: 5000 * 1000,
      pay_date_act: new Date(),
      builder: randomUUID(),
      negotiation: {
        description: 'Pagamento em 2 vezes',
      },
      users: [
        { role: 'SELLER', user_id: randomUUID() },
        { role: 'PICKUP', user_id: randomUUID() },
        { role: 'MANAGER', user_id: randomUUID() },
      ],
      clients: [
        { role: 'SELLER', client_id: randomUUID() },
        { role: 'BUYER', client_id: randomUUID() },
      ],
    })

    expect(sale.id).toEqual(expect.any(String))
  })
})
