import { User } from '@prisma/client'
import { UsersRepository } from '../repositories/users-repository'

interface SearchUseUseCaseRequest {
  query: string
  page: number
}

interface SearchUserUseCaseResponse {
  users: User[]
}

export class SearchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    query,
    page,
  }: SearchUseUseCaseRequest): Promise<SearchUserUseCaseResponse> {
    const users = await this.usersRepository.findMany(query, page)

    return { users }
  }
}
