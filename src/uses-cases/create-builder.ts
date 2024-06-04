import { BuilderRepository } from '@/repositories/builders-repository'
import { Builder } from '@prisma/client'
import { BuilderAlreadyExistsError } from './errors/builder-already-exists-error'

interface CreateBuilderUseCaseRequest {
  name: string
  document: string
  active?: boolean
}

interface CreateBuilderUseCaseResponse {
  builder: Builder
}

export class CreateBuilderUseCase {
  constructor(private buildersRepository: BuilderRepository) {}

  async execute({
    name,
    document,
    active,
  }: CreateBuilderUseCaseRequest): Promise<CreateBuilderUseCaseResponse> {
    const isBuilderExists = await this.buildersRepository.findByDocument(document)

    if (isBuilderExists) {
      throw new BuilderAlreadyExistsError()
    }

    const builder = await this.buildersRepository.create({
      name,
      document,
      active,
    })

    return { builder }
  }
}
