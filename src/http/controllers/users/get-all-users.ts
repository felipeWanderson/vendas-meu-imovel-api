import { QueriesUsers, userRole } from "@/repositories/users-repository";
import { makeSearchUsersUseCase } from "@/uses-cases/factories/make-search-users-use-case";
import { makeSearchSalesUseCase } from "@/uses-cases/factories/sale/make-search-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const queryParamsSchema = z.object({
    name: z.string().optional(),
    role: z.enum([userRole.ADMIN, userRole.REALTOR, userRole.MANAGER]).optional(),
    active: z.string().optional().default('true'),
    page: z.coerce.number().min(1).default(1),
    perPage: z.coerce.number().min(1).default(10),
  })

  try {
    const { page, name, active, role, perPage} = queryParamsSchema.parse(request.query)

    const query = {
      active: active === 'true' ? true : false,
      name, 
      role
    } as QueriesUsers

    const searchUsersUseCase = makeSearchUsersUseCase()


    const {users, total} = await searchUsersUseCase.execute({ page, query, perPage })
    
    return reply
      .status(200)
      .send({
        itens: users,
        total
      })
  } catch (error) {
    throw error
  }
}