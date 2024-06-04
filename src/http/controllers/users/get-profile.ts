import { InvalidCredentialsError } from '@/uses-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/uses-cases/factories/make-authenticate-use-case'
import { makeGetUserUseCase } from '@/uses-cases/factories/make-get-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function GetProfile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getUserUseCase = makeGetUserUseCase()

    const { user } = await getUserUseCase.execute({
      id: request.user.sub,
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined,
      }
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(401).send({
        message: error.message,
      })
    }

    throw error
  }
}
