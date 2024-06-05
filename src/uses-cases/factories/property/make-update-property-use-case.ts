import { PrismaBuildersRepository } from '@/repositories/prisma/prisma-builders-repository'
import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-property-repository'
import { UpdatePropertyUseCase } from '@/uses-cases/update-property'

export function makeUpdatePropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const builderRepository = new PrismaBuildersRepository()
  const updatePropertyUseCase = new UpdatePropertyUseCase(builderRepository, propertiesRepository)

  return updatePropertyUseCase
}
