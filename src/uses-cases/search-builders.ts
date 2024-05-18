import { Builder } from '@prisma/client'
import {
  BuilderRepository,
  QueriesBuider,
} from '@/repositories/builders-repository'

interface SearchBuildersUseCaseRequest {
  query: QueriesBuider
  page: number
}

interface SearchBuildersrUseCaseResponse {
  builders: Builder[]
}

export class SearchBuildersrUseCase {
  constructor(private buildersRepository: BuilderRepository) {}

  async execute({
    query,
    page,
  }: SearchBuildersUseCaseRequest): Promise<SearchBuildersrUseCaseResponse> {
    const builders = await this.buildersRepository.findMany(query, page)

    return { builders }
  }
}
