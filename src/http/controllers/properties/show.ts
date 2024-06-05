import { BuilderNotExistsError } from '@/uses-cases/errors/builder-not-exists-error'
import { PropertyNotExistsError } from '@/uses-cases/errors/property-not-exists-error'
import { makeGetBuilderUseCase } from '@/uses-cases/factories/make-get-builder'
import { makeGetPropertyUseCase } from '@/uses-cases/factories/property/make-get-property-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function showProperty(request: FastifyRequest, reply: FastifyReply) {

  const showParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = showParamsSchema.parse(request.params)

    const getPropertyUseCase = makeGetPropertyUseCase()


    const {property} = await getPropertyUseCase.execute({ id })
    
    
    return reply
      .status(200)
      .send({
        property
      })
  } catch (error) {
    if (error instanceof PropertyNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
