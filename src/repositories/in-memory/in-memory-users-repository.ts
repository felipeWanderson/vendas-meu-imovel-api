import { User, Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async update(id: string, data: Prisma.UserUpdateInput) {
    const userIndex = this.items.findIndex((item) => item.id === id)
    const user = this.items[userIndex]
    const updatedUser = {
      ...user,
      ...data,
    } as User

    this.items[userIndex] = updatedUser

    return updatedUser
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      is_ranking: data.is_ranking,
      avatar_url: data.avatar_url,
      password_hash: data.password_hash,
      roles: data.roles,
    } as User

    this.items.push(user)

    return user
  }
}
