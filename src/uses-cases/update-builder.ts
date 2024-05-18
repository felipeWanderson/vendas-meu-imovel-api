import { Builder } from '@prisma/client'
import { BuilderRepository } from '@/repositories/builders-repository'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'

interface UpdateBuilderUseCaseRequest {
  id: string
  data: {
    name?: string
    document?: string
  }
}

export class UpdateBuilderUseCase {
  constructor(private buildersRepository: BuilderRepository) {}

  async execute({ id, data }: UpdateBuilderUseCaseRequest): Promise<Builder> {
    const builderExists = await this.buildersRepository.findById(id)

    if (!builderExists) {
      throw new BuilderNotExistsError()
    }

    const UpdateBuilder = await this.buildersRepository.update(id, data)

    return UpdateBuilder
  }
}
