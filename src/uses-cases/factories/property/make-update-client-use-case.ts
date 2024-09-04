import { PrismaClientsRepository } from '@/repositories/prisma/prisma-clients-repository'
import { UpdateClientUseCase } from '@/uses-cases/update-client'

export function makeUpdateClientUseCase() {
  const clientsRepository = new PrismaClientsRepository()
  const updateClientUseCase = new UpdateClientUseCase(clientsRepository)

  return updateClientUseCase
}
