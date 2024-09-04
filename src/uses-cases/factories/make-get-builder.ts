import { PrismaBuildersRepository } from '@/repositories/prisma/prisma-builders-repository'
import { GetBuilderUseCase } from '../get-builder'

export function makeGetBuilderUseCase() {
  const buildersRepository = new PrismaBuildersRepository()
  const getUserUseCase = new GetBuilderUseCase(buildersRepository)

  return getUserUseCase
}
