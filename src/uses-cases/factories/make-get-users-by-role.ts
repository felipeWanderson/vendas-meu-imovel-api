import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUserUseCase } from '../get-user'
import { GetUserByRoleUseCase } from '../get-users-by-role'

export function makeGetUsersByRolesUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUsersByUseCase = new GetUserByRoleUseCase(usersRepository)

  return getUsersByUseCase
}
