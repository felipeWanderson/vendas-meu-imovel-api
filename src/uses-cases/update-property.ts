import { Property } from '@prisma/client'
import { BuilderRepository } from '@/repositories/builders-repository'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'
import { PropertyRepository } from '@/repositories/property-repository'
import { PropertyNotExistsError } from './errors/property-not-exists-error'

interface UpdatePropertyUseCaseRequest {
  id: string
  data: {
    name?: string
    builder_id?: string
    address?: {
      postalCode?: string,
      address1?: string,
      address2?: string,
      address3?: string,
      neighborhood?: string,
      city?: string,
      state?: string
    }
    active?: boolean
  }
}

export class UpdatePropertyUseCase {
  constructor(private buildersRepository: BuilderRepository, private propertiesRepository: PropertyRepository) {}

  async execute({ id, data }: UpdatePropertyUseCaseRequest): Promise<Property> {
    const propertyExists = await this.propertiesRepository.findById(id)

    if (!propertyExists) {
      throw new PropertyNotExistsError()
    }

    if (data?.builder_id) {
      const builderExists = await this.buildersRepository.findById(data?.builder_id)

      if (!builderExists) {
        throw new BuilderNotExistsError()
      }
    }

    const updatedProperty = await this.propertiesRepository.update(id, data)

    return updatedProperty
  }
}
