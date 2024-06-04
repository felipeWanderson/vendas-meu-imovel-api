import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '../authenticate'
import { GetUserUseCase } from '../get-user'

export function makeGetUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserUseCase = new GetUserUseCase(usersRepository)

  return getUserUseCase
}
