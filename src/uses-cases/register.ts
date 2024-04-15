import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { UsersRepository, userRole } from '../repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  first_name: string
  last_name: string
  email: string
  password: string
  roles: userRole[]
  is_ranking?: boolean
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    first_name,
    last_name,
    password,
    email,
    roles,
    is_ranking,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      first_name,
      last_name,
      password_hash,
      email,
      roles,
      is_ranking,
    })

    return {
      user,
    }
  }
}
