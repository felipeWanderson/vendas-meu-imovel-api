import { ClientsRepository } from "@/repositories/clients-repository"
import { Client } from "@prisma/client"

interface VerifyClientRequest {
  document: string
}
export class VerifyClientUseCase {
  constructor(private clientRepository: ClientsRepository) {}

  async execute({ document }:VerifyClientRequest ): Promise<Client | null> {
    const client = await this.clientRepository.findByDocument(document)

    if (!client) {
      return null
    }

   
    return client
  }
}