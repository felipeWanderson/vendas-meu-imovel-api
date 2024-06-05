import { BuilderRepository } from '@/repositories/builders-repository'
import { Builder, Property } from '@prisma/client'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'
import { PropertyRepository } from '@/repositories/property-repository'

interface DeletePropertyUseCaseRequest {
  id: string
}

export class DeletePropertiesUseCase {
  constructor(private propertiesRepository: PropertyRepository) {}

  async execute({ id }: DeletePropertyUseCaseRequest): Promise<Property> {
    const propertyExists = await this.propertiesRepository.findById(id)

    if (!propertyExists) {
      throw new BuilderNotExistsError()
    }

    const deleteProperty = await this.propertiesRepository.delete(id)

    return deleteProperty
  }
}
