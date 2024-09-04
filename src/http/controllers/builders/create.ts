import { BuilderAlreadyExistsError } from '@/uses-cases/errors/builder-already-exists-error'
import { BuilderNotExistsError } from '@/uses-cases/errors/builder-not-exists-error'
import { InvalidCredentialsError } from '@/uses-cases/errors/invalid-credentials-error'
import { makeCreateBuilderUseCase } from '@/uses-cases/factories/make-create-builder-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createBuilder(request: FastifyRequest, reply: FastifyReply) {
  const createBuilderBodySchema = z.object({
    name: z.string({ required_error: 'Nome é obrigatorio' }),
    document: z.string({ required_error: 'CNPJ é obrigatorio' }),
  })

  const { name, document } =
  createBuilderBodySchema.parse(request.body)

  try {
    const createBuilderUseCase = makeCreateBuilderUseCase()

    const {builder} = await createBuilderUseCase.execute({
      name, document
    })
    
    
    return reply
      .status(200)
      .send({
        builder
      })
  } catch (error) {
    if (error instanceof BuilderAlreadyExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
