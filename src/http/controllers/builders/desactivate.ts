import { BuilderNotExistsError } from '@/uses-cases/errors/builder-not-exists-error'
import { makeDesactivateBuilderUseCase } from '@/uses-cases/factories/make-desactivate-builder-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function desactivateBuilder(request: FastifyRequest, reply: FastifyReply) {

  const showParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = showParamsSchema.parse(request.params)
    const desactivateBuilder = makeDesactivateBuilderUseCase()
    await desactivateBuilder.execute({ id })
    
    
    return reply
      .status(204)
      .send({})
  } catch (error) {
    if (error instanceof BuilderNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
