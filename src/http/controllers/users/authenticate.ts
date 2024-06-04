import { EXPIRES_IN_ACCESS_TOKEN_IN, EXPIRES_IN_REFRESH_TOKEN_IN_TEXT } from '@/constants'
import { InvalidCredentialsError } from '@/uses-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/uses-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { password, email } =
    authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })
    const token = await reply.jwtSign({
     roles: user.roles
    }, {
      sign: {
        sub: user.id,
      }
    })

    const refreshToken = await reply.jwtSign(
      { roles: user.roles},
      {
        sign: {
          sub: user.id,
          expiresIn: EXPIRES_IN_REFRESH_TOKEN_IN_TEXT,
        },
      },
    )

    
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({
        token,
        expiresIn: EXPIRES_IN_ACCESS_TOKEN_IN,
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
