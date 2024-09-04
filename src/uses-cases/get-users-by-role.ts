import { User, UserRole } from '@prisma/client'
import { userRole, UsersRepository } from '../repositories/users-repository'
import { UserNotExistsError } from './errors/user-not-exists-error'

interface GetUsersByRolesUseCaseRequest {
  role: userRole
}

interface GetUsersByRolesUseCaseResponse {
  users: User[]
}

export class GetUserByRoleUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    role,
  }: GetUsersByRolesUseCaseRequest): Promise<GetUsersByRolesUseCaseResponse> {
    const users = await this.usersRepository.findManyByRole(role)

    return {
      users: users || [],
    }
  }
}
