import { SaleNotExistsError } from '@/uses-cases/errors/sales-not-exists'
import { makeGetSaleByIdUseCase } from '@/uses-cases/factories/sale/make-get-sale-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getSaleByIdParamsSchema = z.object({
  id: z.string().uuid(),
})

export async function getSaleById(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = getSaleByIdParamsSchema.parse(request.params)
    const getSaleByIdUseCase = makeGetSaleByIdUseCase()

    const sale = await getSaleByIdUseCase.execute({ id })

    return reply
      .status(200)
      .send({
        sale,
      })
  } catch (error) {
    if (error instanceof SaleNotExistsError) {
      reply.status(400).send({ error: error.message });
    }
    reply.status(500).send({ error })
  }
}