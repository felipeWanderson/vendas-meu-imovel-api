import { BuilderNotExistsError } from '@/uses-cases/errors/builder-not-exists-error'
import { InvalidCredentialsError } from '@/uses-cases/errors/invalid-credentials-error'
import { makeUpdateBuilderUseCase } from '@/uses-cases/factories/make-update-builder-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateBuilder(request: FastifyRequest, reply: FastifyReply) {

  const updateBuilderParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateBuilderBodySchema = z.object({
    name: z.string().optional(),
    document: z.string().optional(),
  })

  try {
    const { id } = updateBuilderParamsSchema.parse(request.params)

    const body = updateBuilderBodySchema.parse(request.body)

    const updateBuilder = makeUpdateBuilderUseCase()


    const builder = await updateBuilder.execute({ id, data: body })
    
    
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
