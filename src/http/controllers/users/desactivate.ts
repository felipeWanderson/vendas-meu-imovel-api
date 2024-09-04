import { userRole } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/uses-cases/errors/user-already-exists-error'
import { UserNotExistsError } from '@/uses-cases/errors/user-not-exists-error'
import { makeDesactivateUserUseCase } from '@/uses-cases/factories/make-desactivate-user-use-case'
import { makeUpdateUserUseCase } from '@/uses-cases/factories/make-update-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function desactivateUser(request: FastifyRequest, reply: FastifyReply) {
  const desactivateUserParamsSchema = z.object({
    id: z.string().uuid(),
  })
  
  const { id } = desactivateUserParamsSchema.parse(request.params)
  try {
    const desactivateUserUseCase = makeDesactivateUserUseCase()

    await desactivateUserUseCase.execute({id})

    return reply.status(204).send()
  } catch (error) {
    if (error instanceof UserNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
