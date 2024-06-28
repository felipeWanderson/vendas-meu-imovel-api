import { BuilderRepository } from '@/repositories/builders-repository'
import { Builder, Client } from '@prisma/client'
import { BuilderAlreadyExistsError } from './errors/builder-already-exists-error'
import { ClientsRepository } from '@/repositories/clients-repository'
import { ClientAlreadyExistsError } from './errors/client-already-exists-error'

interface CreateClientUseCaseRequest {
  name: string
  document: string
  active?: boolean
}

interface CreateClientUseCaseResponse {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({
    name,
    document,
    active,
  }: CreateClientUseCaseRequest): Promise<CreateClientUseCaseResponse> {
    const isClientExists = await this.clientsRepository.findByDocument(document)

    if (isClientExists) {
      throw new ClientAlreadyExistsError()
    }

    const client = await this.clientsRepository.create({
      name,
      document,
      active,
    })

    return { client }
  }
}
