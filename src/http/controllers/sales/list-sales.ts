import { QueriesSales } from '@/repositories/sales-repository'
import { makeSearchSalesUseCase } from '@/uses-cases/factories/sale/make-search-sale-use-case'
import { serializeSale } from '@/utils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listSales(request: FastifyRequest, reply: FastifyReply) {

  const queryParamsSchema = z.object({
    id: z.string().uuid().optional(),
    status: z.string().optional(),
    seller: z.string().uuid().optional(),  
    pickup: z.string().uuid().optional(),  
    manager: z.string().uuid().optional(),
    client: z.string().optional(),
    property: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(10),
  })

  try {
    const { page, id, status, seller, pickup, manager, client, property, perPage} = queryParamsSchema.parse(request.query)

    const query = {
      id, 
      status, 
      seller,
      pickup, 
      manager, 
      client,
      property,
    } as QueriesSales

    const searchSalesUseCase = makeSearchSalesUseCase()


    const {sales, total} = await searchSalesUseCase.execute({ page, query, perPage })
    
    const listSales = sales.map(sale => serializeSale(sale))
    
    return reply
      .status(200)
      .send({
        itens: listSales,
        total
      })
  } catch (error) {
    throw error
  }
}
