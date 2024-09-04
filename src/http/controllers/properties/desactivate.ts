import { PropertyNotExistsError } from '@/uses-cases/errors/property-not-exists-error'
import { makeDesactivatePropertyUseCase } from '@/uses-cases/factories/property/make-desactive-property-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function desactivateProperty(request: FastifyRequest, reply: FastifyReply) {

  const showParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = showParamsSchema.parse(request.params)
    const desactivateProperty = makeDesactivatePropertyUseCase()
    await desactivateProperty.execute({ id })
    
    
    return reply
      .status(204)
      .send({})
  } catch (error) {
    if (error instanceof PropertyNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
