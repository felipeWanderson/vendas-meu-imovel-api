import { ClientAlreadyExistsError } from '@/uses-cases/errors/client-already-exists-error'
import { makeCreateClientUseCase } from '@/uses-cases/factories/client/make-create-client-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createClient(request: FastifyRequest, reply: FastifyReply) {
  const createClientBodySchema = z.object({
    name: z.string({ required_error: 'Nome é obrigatorio' }),
    document: z.string({ required_error: 'CNPJ é obrigatorio' }),
  })

  const { name, document } =
  createClientBodySchema.parse(request.body)

  try {
    const createClientUseCase = makeCreateClientUseCase()

    const {client} = await createClientUseCase.execute({
      name, document
    })
    
    
    return reply
      .status(200)
      .send({
        client
      })
  } catch (error) {
    if (error instanceof ClientAlreadyExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
