import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { CreateClientUseCase } from '@/uses-cases/create-client'

export function makeCreateClientUseCase() {
  const clientRepository = new PrismaClientsRepository()
  const createClientUseCase = new CreateClientUseCase(clientRepository)

  return createClientUseCase
}
