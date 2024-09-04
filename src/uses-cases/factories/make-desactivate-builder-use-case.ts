import { PrismaBuildersRepository } from '@/repositories/prisma/prisma-builders-repository'
import { DeleteBuilderUseCase } from '../delete-builder'

export function makeDesactivateBuilderUseCase() {
  const buildersRepository = new PrismaBuildersRepository()
  const desactivateBuilderUseCase = new DeleteBuilderUseCase(buildersRepository)

  return desactivateBuilderUseCase
}
