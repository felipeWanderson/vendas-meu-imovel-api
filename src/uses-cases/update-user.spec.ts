import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateUserUseCase } from './update-user'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { userRole } from '@/repositories/users-repository'
import { randomUUID } from 'crypto'
import { UserNotExistsError } from './errors/user-not-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })
  it('should to update User', async () => {
    const user = await usersRepository.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      roles: [userRole.ADMIN],
      is_ranking: false,
      password_hash: await hash('123456', 6),
    })

    const payloadUpdateuser = {
      email: 'johndoetest@example.com',
    }
    const userUpdated = await sut.execute({
      id: user.id,
      data: payloadUpdateuser,
    })

    expect(userUpdated.email).toEqual('johndoetest@example.com')
  })

  it('should not be able to update user if user not exists', async () => {
    const userId = randomUUID()

    const payloadUpdateuser = {
      email: 'johndoetest@example.com',
    }

    await expect(() =>
      sut.execute({
        id: userId,
        data: payloadUpdateuser,
      }),
    ).rejects.toBeInstanceOf(UserNotExistsError)
  })
})
