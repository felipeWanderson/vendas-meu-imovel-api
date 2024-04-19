import { Prisma, User } from '@prisma/client'

export enum userRole {
  ADMIN = 'ADMIN',
  REALTOR = 'REALTOR',
  MANAGER = 'MANAGER',
}

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: Prisma.UserCreateInput): Promise<User>
  update(id: string, data: Prisma.UserUpdateInput): Promise<User>
  delete(id: string): Promise<User>
}
