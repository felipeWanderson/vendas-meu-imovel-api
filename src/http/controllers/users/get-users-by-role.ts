import { userRole } from '@/repositories/users-repository'
import { makeGetUsersByRolesUseCase } from '@/uses-cases/factories/make-get-users-by-role'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getUsersByRole(request: FastifyRequest, reply: FastifyReply) {

  const queryParamsSchema = z.object({
   role: z.enum([userRole.ADMIN, userRole.REALTOR, userRole.MANAGER]).optional().default(userRole.REALTOR),
  })

  try {
    const {role } = queryParamsSchema.parse(request.query)

    const searchBuilderUseCase = makeGetUsersByRolesUseCase()


    const {users} = await searchBuilderUseCase.execute({ role })
    
    
    return reply
      .status(200)
      .send(users)
  } catch (error) {
    throw error
  }
}
