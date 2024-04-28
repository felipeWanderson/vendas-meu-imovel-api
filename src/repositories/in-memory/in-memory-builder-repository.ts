import { randomUUID } from 'crypto'
import { BuilderRepository } from '../builders-repository'
import { Builder, Prisma } from '@prisma/client'

export class InMemoryBuildersRepository implements BuilderRepository {
  private builders: Builder[] = []
  async findById(id: string) {
    throw new Error('Method not implemented.')
  }

  async findByEmail(email: string) {
    throw new Error('Method not implemented.')
  }

  async findMany(query: string, page: number) {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.BuilderCreateInput) {
    const { name, document, active } = data
    const builder = {
      id: randomUUID(),
      name,
      document,
      active: active || true,
    }

    this.builders.push(builder)

    return builder
  }

  async update(id: string, data: Prisma.BuilderUpdateInput) {
    throw new Error('Method not implemented.')
  }

  async delete(id: string) {
    throw new Error('Method not implemented.')
  }
}
