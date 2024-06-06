import { makeCreateSaleUseCase } from '@/uses-cases/factories/sale/make-create-sale-use-case'
import { ClientSaleRole, UserSaleRole } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'


export async function createSaleNew(request: FastifyRequest, reply: FastifyReply) {
  const createSaleBodySchema = z.object({
    plant_property_id: z.string().uuid(),
    unity: z.string(),
    amount: z.bigint().or(z.number()),
    date_sale: z.date().or(z.string()),
    act:  z.bigint().or(z.number()),
    pay_date_act: z.date().or(z.string()),
    negotiation: z.object({
      description: z.string(),
    }),
    users: z.array( z.object({
      role: z.enum([UserSaleRole.MANAGER, UserSaleRole.PICKUP, UserSaleRole.SELLER]),
      user_id: z.string().uuid(),
    })),
    clients: z.array(z.object({
      role: z.enum([ClientSaleRole.BUYER, ClientSaleRole.SELLER]),
      client_id: z.string().uuid(),
    }))
  })

  const payload =
  createSaleBodySchema.parse(request.body)

  try {
    const createSaleUseCase = makeCreateSaleUseCase()

    const {sale} = await createSaleUseCase.execute(payload)
    
    return reply
      .status(200)
      .send({
        sale
      })
  } catch (error) {
    throw error
  }
}
