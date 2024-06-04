import { BuilderRepository } from '@/repositories/builders-repository'
import { Builder } from '@prisma/client'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteBuilderUseCase {
  constructor(private buildersRepository: BuilderRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<Builder> {
    const builderExists = await this.buildersRepository.findById(id)

    if (!builderExists) {
      throw new BuilderNotExistsError()
    }

    const deleteBuilder = await this.buildersRepository.delete(id)

    return deleteBuilder
  }
}
