import { hash } from 'bcryptjs'
import { UsersRepository, userRole } from '../repositories/users-repository'
import { UserNotExistsError } from './errors/user-not-exists-error'
import { User } from '@prisma/client'

interface UpdateUserUseCaseRequest {
  id: string
  data: {
    first_name?: string
    last_name?: string
    email?: string
    password?: string
    roles?: userRole[]
    is_ranking?: boolean
    avatar_url?: string
  }
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id, data }: UpdateUserUseCaseRequest): Promise<User> {
    let payloadUpdate = {}

    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    if (data?.password) {
      const password_hash = await hash(data?.password, 6)
      payloadUpdate = {
        ...payloadUpdate,
        password_hash,
      }
    }

    payloadUpdate = {
      ...payloadUpdate,
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      roles: data?.roles,
      is_ranking: data?.is_ranking,
      avatar_url: data?.avatar_url,
    }

    const updateUser = await this.usersRepository.update(id, payloadUpdate)

    return updateUser
  }
}
