import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UpdatedUser, userRole, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findManyByRole(role: userRole) {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
      },
      where: {
        roles: {
          has: role,
        },
        active: true,
      },
    })

    return users as User[]
  }
 
  
  findMany(query: string, page: number): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
  async delete(id: string) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    })

    return user
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    const user = await prisma.user.update({
      select: {
        id: true,
        avatar_url: true,
        email: true,
        last_name: true,
        first_name: true,
        roles: true,
        
      },
      where: {
        id,
      },
      data,
    })

    return user as UpdatedUser
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
