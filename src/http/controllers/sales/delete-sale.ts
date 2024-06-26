import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteSaleUseCase } from '@/uses-cases/factories/sale/make-delete-sale-use-case';
import { SaleNotExistsError } from '@/uses-cases/errors/sales-not-exists';

const deleteSaleParamsSchema = z.object({
  id: z.string().uuid(),
})

const deleteSaleBodySchema = z.object({
  fall_motive: z.string(),
})

export async function deleteSale(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = deleteSaleParamsSchema.parse(request.params)
    const { fall_motive } = deleteSaleBodySchema.parse(request.body)
    const deleteSaleUseCase = makeDeleteSaleUseCase()

    const sale = await deleteSaleUseCase.execute({ id, fall_motive })

    return reply
      .status(200)
      .send({
        sale,
      })
  } catch (error) {
    if (error instanceof SaleNotExistsError) {
      reply.status(400).send({ error: error.message });
    }
    reply.status(500).send({ error: error })
  }
}