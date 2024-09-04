import { ClientSaleRole, StatusSale, UserSaleRole } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { serializeSale } from '@/utils';
import { makeUpdateSaleUseCase } from '@/uses-cases/factories/sale/make-update-sale-use-case';
import { SaleNotExistsError } from '@/uses-cases/errors/sales-not-exists';

const updateSaleBodySchema = z.object({
  status: z.enum([StatusSale.PROCESSING, StatusSale.CONCLUDED]).optional(),
  single_property: z.string().optional(),
  plant_property_id: z.string().uuid().optional().nullable(),
  unity: z.string().optional(),
  amount: z.number().optional(),
  date_sale: z.string().optional(),
  act: z.number().optional(),
  fall_motive: z.string().optional(),
  pay_date_act: z.string().optional(),
  negotiation: z.object({
    description: z.string(),
  }).optional(),
  users: z.array(z.object({
    role: z.enum([UserSaleRole.MANAGER, UserSaleRole.PICKUP, UserSaleRole.SELLER]),
    user_id: z.string().uuid(),
  })).optional(),
  clients: z.array(z.object({
    role: z.enum([ClientSaleRole.BUYER, ClientSaleRole.SELLER]),
    client_id: z.string().uuid(),
  })).optional(),
})

export type PayloadUpdateSale = z.infer<typeof updateSaleBodySchema>

export async function updateSale(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateSaleParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = updateSaleParamsSchema.parse(request.params)
    const payload: PayloadUpdateSale = updateSaleBodySchema.parse(request.body)
    const updateSaleUseCase = makeUpdateSaleUseCase()

    const sale = await updateSaleUseCase.execute({ id, data: payload })

    return reply
      .status(200)
      .send(serializeSale(sale))
  } catch (error) {
    if (error instanceof SaleNotExistsError) {
      reply.status(400).send({ error: error.message });
    }
    reply.status(500).send({ error: error })
  }
}