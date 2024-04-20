import { userRole } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/uses-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/uses-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    password: z.string().min(6),
    roles: z.string().array().default(['REALTOR']),
    email: z.string().email(),
    is_ranking: z.boolean().default(true),
  })

  const { first_name, last_name, password, roles, email, is_ranking } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      first_name,
      last_name,
      password,
      roles: roles.map((role) => role as userRole),
      email,
      is_ranking,
    })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    throw error
  }

  return reply.status(201).send()
}
