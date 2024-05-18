import { Builder } from '@prisma/client'
import { BuilderRepository } from '@/repositories/builders-repository'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'

interface GetBuilderUseCaseRequest {
  id: string
}

interface GetBuilderUseCaseResponse {
  builder: Builder
}

export class GetBuilderUseCase {
  constructor(private buildersRepository: BuilderRepository) {}

  async execute({
    id,
  }: GetBuilderUseCaseRequest): Promise<GetBuilderUseCaseResponse> {
    const builder = await this.buildersRepository.findById(id)

    if (!builder) {
      throw new BuilderNotExistsError()
    }

    return {
      builder,
    }
  }
}
