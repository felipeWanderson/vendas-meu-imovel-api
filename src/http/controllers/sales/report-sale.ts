import { QueriesSales } from '@/repositories/sales-repository'
import { makeReportSalesUseCase } from '@/uses-cases/factories/sale/make-report-sale-use-case'
import { serializeSale } from '@/utils'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function reportSale(request: FastifyRequest, reply: FastifyReply) {

  const queryParamsSchema = z.object({
    id: z.string().uuid().optional(),
    status: z.string().optional(),
    seller: z.string().uuid().optional(),  
    pickup: z.string().uuid().optional(),  
    manager: z.string().uuid().optional(),
    client: z.string().optional(),
    property: z.string().optional(),
  })

  try {
    const { id, status, seller, pickup, manager, client, property} = queryParamsSchema.parse(request.query)

    const query = {
      id, 
      status, 
      seller,
      pickup, 
      manager, 
      client,
      property,
    } as QueriesSales

    const reportSalesUseCase = makeReportSalesUseCase()


    const buffer = await reportSalesUseCase.execute({query})
    
    reply.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    reply.header('Content-Disposition', 'attachment; filename="sales-report.xlsx"');

    return reply
      .status(200)
      .send(buffer)
  } catch (error) {
    throw error
  }
}
