import { BuilderNotExistsError } from '@/uses-cases/errors/builder-not-exists-error'
import { makeGetBuilderUseCase } from '@/uses-cases/factories/make-get-builder'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function showBuilder(request: FastifyRequest, reply: FastifyReply) {

  const showParamsSchema = z.object({
    id: z.string().uuid(),
  })

  try {
    const { id } = showParamsSchema.parse(request.params)

    const getBuilderUseCase = makeGetBuilderUseCase()


    const {builder} = await getBuilderUseCase.execute({ id })
    
    
    return reply
      .status(200)
      .send({
        builder
      })
  } catch (error) {
    if (error instanceof BuilderNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
