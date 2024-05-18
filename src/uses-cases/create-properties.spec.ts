import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryBuildersRepository } from '@/repositories/in-memory/in-memory-builder-repository'
import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-property-repository'
import { CreatePropertyUseCase } from './create-properties'
import { randomUUID } from 'crypto'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'

let propertiesRepository: InMemoryPropertiesRepository
let buildersRepository: InMemoryBuildersRepository
let sut: CreatePropertyUseCase

describe('Create Property Use Case', () => {
  beforeEach(() => {
    propertiesRepository = new InMemoryPropertiesRepository()
    buildersRepository = new InMemoryBuildersRepository()
    sut = new CreatePropertyUseCase(propertiesRepository, buildersRepository)
  })
  it('should to register a property', async () => {
    const builder = await buildersRepository.create({
      document: '12345678910',
      name: 'Canopus Construções',
      active: true,
    })
    const { property } = await sut.execute({
      name: 'Village dos Pássaros',
      builder_id: builder.id,
      address: {
        address1: 'Rua dos Pássaros',
        address2: 'Casa dos Pássaros',
        address3: 'Casa dos Pássaros',
        city: 'São José de Ribamar',
        neighborhood: 'Píndai',
        postalCode: '65200-000',
        state: 'MA' 
      },
    })

    expect(property.id).toEqual(expect.any(String))
  })

  it('should not be possible to register a property without a valid construtora', async () => {
    const builderId = randomUUID();

    await expect(() =>
      sut.execute({
        name: 'Village dos Pássaros',
        builder_id: builderId,
        address: {
          address1: 'Rua dos Pássaros',
          address2: 'Casa dos Pássaros',
          address3: 'Casa dos Pássaros',
          city: 'São José de Ribamar',
          neighborhood: 'Píndai',
          postalCode: '65200-000',
          state: 'MA' 
        },
      })
    ).rejects.toBeInstanceOf(BuilderNotExistsError)
  })
})
