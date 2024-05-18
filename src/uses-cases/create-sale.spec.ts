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
  it('must be possible to register a sale of used property', async () => {
    const { sale } = await sut.execute({
      single_property: "Apartamento 1",
      unity: 'Bloco B',
      date_sale: new Date(),
      amount: 150000 * 1000,
      act: 5000 * 1000,
      pay_date_act: new Date(),
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
  it('must be possible to register a property sale on the plan', async () => {
    const { sale } = await sut.execute({
      plant_property_id: randomUUID(),
      unity: 'Bloco B',
      date_sale: new Date(),
      amount: 150000 * 1000,
      act: 5000 * 1000,
      pay_date_act: new Date(),
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
