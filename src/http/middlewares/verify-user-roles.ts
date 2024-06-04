import { UserRole } from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: UserRole) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { roles } = request.user

    const isVerifyUserRole = roles.find((role) => role === roleToVerify)

    if (!isVerifyUserRole) {
      return reply.status(403).send({ message: 'dont have permission' })
    }
  }
}