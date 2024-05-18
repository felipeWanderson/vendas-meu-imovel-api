import { BuilderRepository } from '@/repositories/builders-repository'
import { PropertyAddress, PropertyRepository } from '@/repositories/property-repository'
import { Builder, Prisma, Property } from '@prisma/client'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'


interface CreatePropertyUseCaseRequest {
  name: string
  address: PropertyAddress,
  builder_id: string
}

interface CreatePropertyUseCaseResponse {
  property: Property
}

export class CreatePropertyUseCase {
  constructor(private propertiesRepository: PropertyRepository, private buildersRepository: BuilderRepository) {}

  async execute({
    name,
    address,
    builder_id
  }: CreatePropertyUseCaseRequest): Promise<CreatePropertyUseCaseResponse> {

    const builder = await this.buildersRepository.findById(builder_id)

    if (!builder) {
      throw new BuilderNotExistsError();
    }

    const property = await this.propertiesRepository.create({
     name,
     address,
     builder_id
    })

    return { property }
  }
}
