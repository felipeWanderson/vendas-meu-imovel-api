import { Builder, Prisma } from '@prisma/client'

export interface QueriesBuider {
  name?: string
  document?: string
  active?: boolean
}

export interface BuilderRepository {
  findById(id: string): Promise<Builder | null>
  findByDocument(name: string): Promise<Builder | null>
  findMany(query?: QueriesBuider, page?: number): Promise<Builder[]>
  create(data: Prisma.BuilderCreateInput): Promise<Builder>
  update(id: string, data: Prisma.BuilderUpdateInput): Promise<Builder>
  delete(id: string): Promise<Builder>
}
