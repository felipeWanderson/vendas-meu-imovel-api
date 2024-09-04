import { Client, Property } from '@prisma/client'
import { BuilderRepository } from '@/repositories/builders-repository'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'
import { PropertyRepository } from '@/repositories/property-repository'
import { PropertyNotExistsError } from './errors/property-not-exists-error'
import { ClientsRepository } from '@/repositories/clients-repository'
import { ClientNotExistsError } from './errors/client-not-existis-error'

interface UpdateClientUseCaseRequest {
  id: string
  data: {
    name?: string
    document?: string
    }
    active?: boolean
}

export class UpdateClientUseCase {
  constructor(private clientsRepository: ClientsRepository) {}

  async execute({ id, data }: UpdateClientUseCaseRequest): Promise<Client> {
    const clientExists = await this.clientsRepository.findById(id)

    if (!clientExists) {
      throw new ClientNotExistsError()
    }
    const updatedClient = await this.clientsRepository.update(id, data)

    return updatedClient
  }
}
