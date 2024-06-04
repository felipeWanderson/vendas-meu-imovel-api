import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function verifyToken(request: FastifyRequest, reply: FastifyReply) {
  try {
    const verifyBodySchema = z.object({
      type: z.enum(['access', 'refresh']),
    })
    const { type } =
    verifyBodySchema.parse(request.body)

    if (type === 'access') {
      await request.jwtVerify()
      return reply.status(200).send({ success: true })
    }
    if (type === 'refresh') {
      await request.jwtVerify({ onlyCookie: true })
      return reply.status(200).send({ success: true })
    }
   
  } catch (err) {
    return reply.status(200).send({ success: false })
  }
}
