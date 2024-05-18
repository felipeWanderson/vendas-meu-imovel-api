import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBuildersRepository } from '@/repositories/in-memory/in-memory-builder-repository'
import { SearchBuildersrUseCase } from './search-builders'

let buildersRepository: InMemoryBuildersRepository
let sut: SearchBuildersrUseCase

describe('Search builders Use Case', () => {
  beforeEach(() => {
    buildersRepository = new InMemoryBuildersRepository()
    sut = new SearchBuildersrUseCase(buildersRepository)
  })
  it('should to search builders', async () => {
    await buildersRepository.create({
      document: '12345678910',
      name: 'Canopus Construções',
      active: true,
    })
    await buildersRepository.create({
      document: '12345678998',
      name: 'Monten Plan',
    })

    const { builders } = await sut.execute({ query: {}, page: 1 })

    expect(builders).toHaveLength(2)
    expect(builders).toEqual([
      expect.objectContaining({ name: 'Canopus Construções' }),
      expect.objectContaining({ name: 'Monten Plan' }),
    ])
  })
  it('should be able to fetch paginated builders search', async () => {
    for (let i = 1; i <= 22; i++) {
      await buildersRepository.create({
        name: `builder-${i}`,
        document: `12345678910-${i}`,
      })
    }

    const { builders } = await sut.execute({
      query: { name: 'builder' },
      page: 2,
    })

    expect(builders).toHaveLength(2)
    expect(builders).toEqual([
      expect.objectContaining({ name: 'builder-21' }),
      expect.objectContaining({ name: 'builder-22' }),
    ])
  })
})
