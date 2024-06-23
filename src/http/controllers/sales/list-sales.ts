import { QueriesSales } from '@/repositories/sales-repository'
import { makeSearchSalesUseCase } from '@/uses-cases/factories/sale/make-search-sale-use-case'
import { serializeSale } from '@/utils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listSales(request: FastifyRequest, reply: FastifyReply) {

  const queryParamsSchema = z.object({
    id: z.string().uuid().optional(),
    status: z.string().optional(),
    realtor: z.string().uuid().optional(),
    manger: z.string().uuid().optional(),
    client: z.string().optional(),
    property: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
  })

  try {
    const { page, id, status, realtor, manger, client, property} = queryParamsSchema.parse(request.query)

    const query = {
      id, 
      status, 
      realtor, 
      manger, 
      client,
      property
    } as QueriesSales

    const searchSalesUseCase = makeSearchSalesUseCase()


    const {sales} = await searchSalesUseCase.execute({ page, query })
    
    const listSales = sales.map(sale => serializeSale(sale))
    
    return reply
      .status(200)
      .send({
        sales: listSales
      })
  } catch (error) {
    throw error
  }
}
