import { GetPropertyUseCase } from '@/uses-cases/get-property'
import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-property-repository'

export function makeGetPropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const getPropertyUseCase = new GetPropertyUseCase(propertiesRepository)

  return getPropertyUseCase
}
