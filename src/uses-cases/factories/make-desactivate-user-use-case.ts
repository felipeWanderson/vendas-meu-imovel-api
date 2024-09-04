import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../delete-user'

export function makeDesactivateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const desactivateUserUseCase = new DeleteUserUseCase(usersRepository)

  return desactivateUserUseCase
}
