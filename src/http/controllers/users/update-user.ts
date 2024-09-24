import { userRole } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/uses-cases/errors/user-already-exists-error'
import { UserNotExistsError } from '@/uses-cases/errors/user-not-exists-error'
import { makeUpdateUserUseCase } from '@/uses-cases/factories/make-update-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updateUserParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const updateUserBodySchema = z.object({
      first_name: z.string().optional(),
      last_name: z.string().optional(),
      password: z.string().min(6).optional(),
      roles: z.string().array().optional(),
      email: z.string().email().optional(),
      is_ranking: z.boolean().optional(),
      avatar_url: z.string().url().optional()
    })
  
    const body =
    updateUserBodySchema.parse(request.body)
    
    const { id } = updateUserParamsSchema.parse(request.params)
    const updateUserUseCase = makeUpdateUserUseCase()

    const updatedUser =await updateUserUseCase.execute({id, data: {
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      is_ranking: body.is_ranking,
      password: body.password,
      roles: body.roles?.map((role) => role as userRole),
      avatar_url: body.avatar_url
    }})

    return reply.status(200).send(updatedUser)
  } catch (error) {
    if (error instanceof UserNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
