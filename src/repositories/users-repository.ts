import { $Enums, Prisma, User, UserRole } from '@prisma/client'

export enum userRole {
  ADMIN = 'ADMIN',
  REALTOR = 'REALTOR',
  MANAGER = 'MANAGER',
}

export interface UpdatedUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: $Enums.UserRole[];
  avatar_url?: string;
}

export interface QueriesUsers {
  name?: string
  role?: userRole
  active?: boolean
}

interface FindyManyResponse {
  users: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: UserRole[];
    avatar_url: string | null;
    active: boolean;
  }[]
  total: number
}

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findManyByRole(role: userRole): Promise<User[] | null>
  findByEmail(email: string): Promise<User | null>
  findMany(query: QueriesUsers, page: number, perPage: number): Promise<FindyManyResponse>
  create(data: Prisma.UserCreateInput): Promise<User>
  update(id: string, data: Prisma.UserUpdateInput): Promise<UpdatedUser>
  delete(id: string): Promise<User>
}
