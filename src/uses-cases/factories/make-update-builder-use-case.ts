import { PrismaBuildersRepository } from '@/repositories/prisma/prisma-builders-repository'
import { UpdateBuilderUseCase } from '../update-builder'

export function makeUpdateBuilderUseCase() {
  const builderRepository = new PrismaBuildersRepository()
  const updateBuilderUseCase = new UpdateBuilderUseCase(builderRepository)

  return updateBuilderUseCase
}
