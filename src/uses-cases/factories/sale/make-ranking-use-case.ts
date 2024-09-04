import { PrismaRankingRepository } from '@/repositories/prisma/prisma-ranking-repository'
import { GetRanking } from '@/uses-cases/get-ranking'

export function makeRankingUseCase() {
  const rankingRepository = new PrismaRankingRepository()
  const GetRankingUseCase = new GetRanking(rankingRepository)

  return GetRankingUseCase
}
