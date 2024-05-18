import { randomUUID } from 'crypto'
import { CreateSaleInput, Sale, SalesRepository, UpadateSaleInput } from '../sales-repository'

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

  async update(id: string, data: UpadateSaleInput): Promise<Sale> {
    const saleIndex = this.items.findIndex((item) => item.id === id)
    const sale = this.items[saleIndex]
    const updatedSales = {
      ...sale,
      ...data,
    } as Sale

    this.items[saleIndex] = updatedSales

    return updatedSales
  }
  
  async findById(id: string): Promise<Sale | null> {
    const sale = this.items.find((item) => item.id === id)

    if (!sale) {
      return null
    }

    return sale
  }
}
