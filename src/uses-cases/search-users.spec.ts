import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { userRole } from '@/repositories/users-repository'
import { SearchUserUseCase } from './search-users'

let usersRepository: InMemoryUsersRepository
let sut: SearchUserUseCase

describe('Search user Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new SearchUserUseCase(usersRepository)
  })
  it('should to search users', async () => {
    await usersRepository.create({
      first_name: 'John1',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      active: true,
      roles: [userRole.ADMIN],
      is_ranking: false,
    })
    await usersRepository.create({
      first_name: 'John2',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      active: true,
      roles: [userRole.ADMIN],
      is_ranking: false,
    })

    const { users } = await sut.execute({ query: 'John', page: 1 })

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      expect.objectContaining({ first_name: 'John1' }),
      expect.objectContaining({ first_name: 'John2' }),
    ])
  })
  it('should be able to fetch paginated users search', async () => {
    for (let i = 1; i <= 22; i++) {
      await usersRepository.create({
        first_name: `John${i}`,
        last_name: 'Doe',
        email: 'johndoe@example.com',
        password_hash: await hash('123456', 6),
        active: true,
        roles: [userRole.ADMIN],
        is_ranking: false,
      })
    }

    const { users } = await sut.execute({
      query: 'John',
      page: 2,
    })

    expect(users).toHaveLength(2)
    expect(users).toEqual([
      expect.objectContaining({ first_name: 'John21' }),
      expect.objectContaining({ first_name: 'John22' }),
    ])
  })
})
