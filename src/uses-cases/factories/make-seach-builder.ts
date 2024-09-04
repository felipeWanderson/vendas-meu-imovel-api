import { PrismaBuildersRepository } from '@/repositories/prisma/prisma-builders-repository'
import { SearchBuildersrUseCase } from '../search-builders'

export function makeSearchBuilderUseCase() {
  const builderRepository = new PrismaBuildersRepository()
  const searchBuildersUseCase = new SearchBuildersrUseCase(builderRepository)

  return searchBuildersUseCase
}
