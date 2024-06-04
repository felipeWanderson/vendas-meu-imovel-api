import { EXPIRES_IN_ACCESS_TOKEN_IN, EXPIRES_IN_REFRESH_TOKEN_IN, EXPIRES_IN_REFRESH_TOKEN_IN_TEXT } from '@/constants'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
 try {
  await request.jwtVerify({ onlyCookie: true })

  const { roles } = request.user

  const token = await reply.jwtSign(
    {roles},
    {
      sign: {
        sub: request.user.sub,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {roles},
    {
      sign: {
        sub: request.user.sub,
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
      expiresIn: EXPIRES_IN_ACCESS_TOKEN_IN
    })
 } catch (err) {
  return reply.status(401).send({ message: 'Unauthorized.' })
 }
}