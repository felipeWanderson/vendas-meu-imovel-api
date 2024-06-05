import { makeSearchBuilderUseCase } from '@/uses-cases/factories/make-seach-builder'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listBuilders(request: FastifyRequest, reply: FastifyReply) {

  const queryParamsSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    name: z.string().optional(),
    document: z.string().optional(),
    active: z.string().optional().default('true'),
  })

  try {
    const { page, name, document, active } = queryParamsSchema.parse(request.query)

    const searchBuilderUseCase = makeSearchBuilderUseCase()


    const {builders} = await searchBuilderUseCase.execute({ page, query: { name, document, active: active === 'true' ? true : false} })
    
    
    return reply
      .status(200)
      .send({
        builders
      })
  } catch (error) {
    throw error
  }
}
