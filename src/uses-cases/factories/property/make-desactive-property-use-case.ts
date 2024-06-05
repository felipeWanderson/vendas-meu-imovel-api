import { DeletePropertiesUseCase } from '@/uses-cases/delete-property'
import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-property-repository'

export function makeDesactivatePropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const desactivatePropertyUseCase = new DeletePropertiesUseCase(propertiesRepository)

  return desactivatePropertyUseCase
}
