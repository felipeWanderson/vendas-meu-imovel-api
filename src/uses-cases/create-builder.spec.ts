import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBuildersRepository } from '@/repositories/in-memory/in-memory-builder-repository'
import { CreateBuilderUseCase } from './create-builder'

let buildersRepository: InMemoryBuildersRepository
let sut: CreateBuilderUseCase

describe('Create Builder Use Case', () => {
  beforeEach(() => {
    buildersRepository = new InMemoryBuildersRepository()
    sut = new CreateBuilderUseCase(buildersRepository)
  })
  it('should to register create a builder', async () => {
    const { builder } = await sut.execute({
      document: '12345678910',
      name: 'Canopus Construções',
      active: true,
    })

    expect(builder.id).toEqual(expect.any(String))
  })
})
