import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateSaleUseCase } from '@/uses-cases/factories/sale/make-validate-sale-use-case'
import { SaleNotExistsError } from '@/uses-cases/errors/sales-not-exists'
import { InvalidSaleStatusError } from '@/uses-cases/errors/invalid-status-sale'
import { MissingPayDateActError } from '@/uses-cases/errors/missing-pay-date-act'
import { serializeSale } from '@/utils'

const validateSaleParamsSchema = z.object({
  id: z.string().uuid(),
})


export async function validateSale(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { id } = validateSaleParamsSchema.parse(request.params)
    const validateSaleUseCase = makeValidateSaleUseCase()

    const sale = await validateSaleUseCase.execute({ id })

    return reply
      .status(200)
      .send(serializeSale(sale))
  } catch (error) {
    if (error instanceof SaleNotExistsError) {
      reply.status(400).send({ error: error.message })
    }
    if (error instanceof InvalidSaleStatusError) {
      reply.status(400).send({ error: error.message })
    }
    if (error instanceof MissingPayDateActError) {
      reply.status(400).send({ error: error.message })
    }
    reply.status(500).send({ error })
  }
}