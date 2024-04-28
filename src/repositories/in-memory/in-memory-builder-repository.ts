import { randomUUID } from 'crypto'
import { BuilderRepository } from '../builders-repository'
import { Builder, Prisma } from '@prisma/client'

export class InMemoryBuildersRepository implements BuilderRepository {
  private builders: Builder[] = []
  async findById(id: string) {
    const builder = this.builders.find((builder) => builder.id === id)
    if (!builder) {
      return null
    }
    return builder
  }

  async findByName(name: string) {
    const builder = this.builders.find(
      (builder) => builder.name.toLowerCase() === name.toLowerCase(),
    )
    if (!builder) {
      return null
    }
    return builder
  }

  async findMany(query: string, page: number) {
    return this.builders
      .filter((item) => item.name.includes(query))
      .slice((page - 1) * 20, page * 20)
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
    const builderIndex = this.builders.findIndex((item) => item.id === id)
    const builder = this.builders[builderIndex]
    const updatedBuilder = {
      ...builder,
      ...data,
    } as Builder

    this.builders[builderIndex] = updatedBuilder

    return updatedBuilder
  }

  async delete(id: string) {
    const builderIndex = this.builders.findIndex((item) => item.id === id)
    const builder = this.builders[builderIndex]
    const updatedBuilder = {
      ...builder,
      active: false,
    }

    this.builders[builderIndex] = updatedBuilder

    return updatedBuilder
  }
}
