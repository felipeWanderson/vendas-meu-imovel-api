import { Builder, Property } from '@prisma/client'
import { BuilderRepository } from '@/repositories/builders-repository'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'
import { PropertyRepository } from '@/repositories/property-repository'
import { PropertyNotExistsError } from './errors/property-not-exists-error'

interface GetPropertyUseCaseRequest {
  id: string
}

interface GetPropertyUseCaseResponse {
  property: Property
}

export class GetPropertyUseCase {
  constructor(private propertiesRepository: PropertyRepository) {}

  async execute({
    id,
  }: GetPropertyUseCaseRequest): Promise<GetPropertyUseCaseResponse> {
    const property = await this.propertiesRepository.findById(id)

    if (!property) {
      throw new PropertyNotExistsError()
    }

    return {
      property,
    }
  }
}
