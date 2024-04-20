import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { userRole } from '@/repositories/users-repository'
import { GetUserUseCase } from './get-user'
import { randomUUID } from 'crypto'
import { UserNotExistsError } from './errors/user-not-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserUseCase(usersRepository)
  })
  it('should to get user', async () => {
    const createdUser = await usersRepository.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      active: true,
      roles: [userRole.ADMIN],
      is_ranking: false,
    })

    const { user } = await sut.execute({ id: createdUser.id })

    expect(user.id).toEqual(createdUser.id)
  })
  it('should not be able to get user if user not exists', async () => {
    const userId = randomUUID()

    await expect(() =>
      sut.execute({
        id: userId,
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
