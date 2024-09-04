import { PrismaBuildersRepository } from '@/repositories/prisma/prisma-builders-repository'
import { CreateBuilderUseCase } from '../create-builder'

export function makeCreateBuilderUseCase() {
  const builderRepository = new PrismaBuildersRepository()
  const authenticateUseCase = new CreateBuilderUseCase(builderRepository)

  return authenticateUseCase
}
