import { PrismaBuildersRepository } from '@/repositories/prisma/prisma-builders-repository'
import { PrismaPropertiesRepository } from '@/repositories/prisma/prisma-property-repository'
import { CreatePropertyUseCase } from '@/uses-cases/create-properties'

export function makeCreatePropertyUseCase() {
  const propertiesRepository = new PrismaPropertiesRepository()
  const buildersRepository = new PrismaBuildersRepository()
  const createPropertyUseCase = new CreatePropertyUseCase(propertiesRepository, buildersRepository)

  return createPropertyUseCase
}
