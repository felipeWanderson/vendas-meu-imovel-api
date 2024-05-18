import { randomUUID } from 'crypto'
import { CreateSaleInput, Sale, SalesRepository } from '../sales-repository'

export class InMemorySalesRepository implements SalesRepository {
  public items: Sale[] = []
  async create(data: CreateSaleInput) {
    const sale = {
      id: randomUUID(),
      status: data.status,
      single_property: data.single_property,
      plant_property_id: data.plant_property_id,
      date_sale: data.date_sale,
      unity: data.unity,
      amount: data.amount,
      pay_date_act: data.pay_date_act,
      act: data.act,
      negotiation: data.negotiation,
      created_at: new Date(),
      users: data.users,
      clients: data.clients,
    } as Sale

    return sale
  }
}
