import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository"
import { SearchUserUseCase } from "../search-users"

export function makeSearchUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const searchUsersUseCase = new SearchUserUseCase(usersRepository)

  return searchUsersUseCase
}