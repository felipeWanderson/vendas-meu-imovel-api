import { Builder, Prisma } from '@prisma/client'

export interface BuilderRepository {
  findById(id: string): Promise<Builder | null>
  findByEmail(email: string): Promise<Builder | null>
  findMany(query: string, page: number): Promise<Builder[]>
  create(data: Prisma.BuilderCreateInput): Promise<Builder>
  update(id: string, data: Prisma.BuilderUpdateInput): Promise<Builder>
  delete(id: string): Promise<Builder>
}
