import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { CreateClientUseCase } from '@/uses-cases/create-client'
import { VerifyClientUseCase } from '@/uses-cases/verify-client-use-case'

export function makeVerifyClientUseCase() {
  const clientRepository = new PrismaClientsRepository()
  const verifyClientUseCase = new VerifyClientUseCase(clientRepository)

  return verifyClientUseCase
}
