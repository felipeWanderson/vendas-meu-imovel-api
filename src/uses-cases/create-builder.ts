import { BuilderRepository } from '@/repositories/builders-repository'
import { Builder } from '@prisma/client'

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
    const builder = await this.buildersRepository.create({
      name,
      document,
      active,
    })

    return { builder }
  }
}
