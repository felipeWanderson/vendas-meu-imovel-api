import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { userRole } from '@/repositories/users-repository'
import { randomUUID } from 'crypto'
import { UserNotExistsError } from './errors/user-not-exists-error'
import { DeleteUserUseCase } from './delete-user'

let usersRepository: InMemoryUsersRepository
let sut: DeleteUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new DeleteUserUseCase(usersRepository)
  })
  it('should to delete user', async () => {
    const user = await usersRepository.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      roles: [userRole.ADMIN],
      is_ranking: false,
      password_hash: await hash('123456', 6),
    })

    const userDeleted = await sut.execute({
      id: user.id,
    })

    expect(userDeleted.active).toEqual(false)
  })

  it('should not be able to delete an user if user not exists', async () => {
    const userId = randomUUID()

    await expect(() =>
      sut.execute({
        id: userId,
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
