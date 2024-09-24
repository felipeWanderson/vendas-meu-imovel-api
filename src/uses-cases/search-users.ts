import { UserRole } from '@prisma/client'
import { QueriesUsers, UsersRepository } from '../repositories/users-repository'

interface SearchUseUseCaseRequest {
  query: QueriesUsers
  page: number
  perPage: number
}

interface User {
  id: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: UserRole[];
    avatar_url: string | null;
    active: boolean;
}

interface SearchUserUseCaseResponse {
  users: User[]
  total: number
}

export class SearchUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    query,
    page,
    perPage
  }: SearchUseUseCaseRequest): Promise<SearchUserUseCaseResponse> {
    const {users, total} = await this.usersRepository.findMany(query, page, perPage)

    return { users, total }
  }
}
