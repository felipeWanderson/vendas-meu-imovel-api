import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryBuildersRepository } from '@/repositories/in-memory/in-memory-builder-repository'
import { GetBuilderUseCase } from './get-builder'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'

let buildersRepository: InMemoryBuildersRepository
let sut: GetBuilderUseCase

describe('Get User Use Case', () => {
  beforeEach(() => {
    buildersRepository = new InMemoryBuildersRepository()
    sut = new GetBuilderUseCase(buildersRepository)
  })
  it('should to get builder', async () => {
    const createdBuilder = await buildersRepository.create({
      name: 'Canopus Construções',
      document: '12345678910',
      active: true,
    })

    const { builder } = await sut.execute({ id: createdBuilder.id })

    expect(builder.id).toEqual(createdBuilder.id)
  })
  it('should not be able to get user if builder not exists', async () => {
    const userId = randomUUID()

    await expect(() =>
      sut.execute({
        id: userId,
      }),
    ).rejects.toBeInstanceOf(BuilderNotExistsError)
  })
})
