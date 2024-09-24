import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { QueriesUsers, UpdatedUser, userRole, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findMany(query: QueriesUsers, page: number, perPage: number) {
    const { role,active, name } = query;
    const whereClause: { [key: string]: any } = {};
    if (name) {
      const nameParts = name.split(' ').filter(part => part.length > 0);
  
      whereClause.AND = nameParts.map(part => ({
        OR: [
          { first_name: { contains: part, mode: 'insensitive' } },
          { last_name: { contains: part, mode: 'insensitive' } },
        ],
      }));
    }

    if (role) {
      whereClause.roles = {
        has: role,
      };
    }
  
    if (active !== undefined) {
      whereClause.active = active;
    }
    const users = await prisma.user.findMany({
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        roles: true,
        avatar_url: true,
        active: true,
      },
      where: whereClause,
      skip: (page - 1) * perPage,
      take: perPage,
    });
  
    const totalCount = await prisma.user.count({ where: whereClause });
  
    return {
      users,
      total: totalCount
    };
  }
 
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
