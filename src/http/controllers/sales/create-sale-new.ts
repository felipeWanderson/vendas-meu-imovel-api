import { makeCreateSaleUseCase } from '@/uses-cases/factories/sale/make-create-sale-use-case'
import { convertToCents, formatPrismaPayloadCreateSale, serializeSale } from '@/utils'
import { ClientSaleRole, UserSaleRole } from '@prisma/client'
import { format, parseISO } from 'date-fns'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createSaleBodySchema = z.object({
  plant_property_id: z.string().uuid(),
  unity: z.string(),
  amount: z.number(),
  date_sale: z.string(),
  act: z.number(),
  pay_date_act: z.string().optional(),
  negotiation: z.object({
    description: z.string(),
  }).optional(),
  users: z.array(z.object({
    role: z.enum([UserSaleRole.MANAGER, UserSaleRole.PICKUP, UserSaleRole.SELLER]),
    user_id: z.string().uuid(),
  })),
  clients: z.array(z.object({
    role: z.enum([ClientSaleRole.BUYER, ClientSaleRole.SELLER]),
    client_id: z.string().uuid(),
  }))
})

export type PayloadCreateSale = z.infer<typeof createSaleBodySchema>

export async function createSaleNew(request: FastifyRequest, reply: FastifyReply) {
  try {
    const payload: PayloadCreateSale =
      createSaleBodySchema.parse(request.body)
    const createSaleUseCase = makeCreateSaleUseCase()

    const { sale } = await createSaleUseCase.execute(formatPrismaPayloadCreateSale(payload))

    return reply
      .status(200)
      .send({
        sale: serializeSale(sale)

      })
  } catch (error) {
    throw error
  }
}
