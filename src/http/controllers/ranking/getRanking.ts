import { makeRankingUseCase } from '@/uses-cases/factories/sale/make-ranking-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const querySchema = z.object({
  month: z.number().min(1).max(12).optional(),
  year: z.number().min(2000).max(new Date().getFullYear()).optional(),
});


export async function getRanking(request: FastifyRequest, reply: FastifyReply) {
  try {
    const { month, year } = querySchema.parse(request.query)
    const getRankingUseCase = makeRankingUseCase()

    const ranking = await  getRankingUseCase.execute({month, year})
    return reply
      .status(200)
      .send({ranking})
  } catch (error) {
    throw error
  }
}
