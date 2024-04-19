import { UsersRepository } from '../repositories/users-repository'
import { UserNotExistsError } from './errors/user-not-exists-error'
import { User } from '@prisma/client'

interface DeleteUserUseCaseRequest {
  id: string
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): Promise<User> {
    const userExists = await this.usersRepository.findById(id)

    if (!userExists) {
      throw new UserNotExistsError()
    }

    const deleteUser = await this.usersRepository.delete(id)

    return deleteUser
  }
}
