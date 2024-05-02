import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryBuildersRepository } from '@/repositories/in-memory/in-memory-builder-repository'
import { GetPropertyUseCase } from './get-property'
import { InMemoryPropertiesRepository } from '@/repositories/in-memory/in-memory-property-repository'
import { PropertyNotExistsError } from './errors/property-not-exists-error'

let propertiesRepository: InMemoryPropertiesRepository
let buildersRepository: InMemoryBuildersRepository
let sut: GetPropertyUseCase

describe('Get Property Use Case', () => {
  beforeEach(() => {
    propertiesRepository = new InMemoryPropertiesRepository()
    buildersRepository = new InMemoryBuildersRepository()
    sut = new GetPropertyUseCase(propertiesRepository)
  })
  it('should to get property', async () => {
    const builder = await buildersRepository.create({
      name: 'Canopus Construções',
      document: '12345678910',
      active: true,
    })
    const createProperty = await propertiesRepository.create({
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

    const { property } = await sut.execute({ id: createProperty.id })

    expect(property.id).toEqual(createProperty.id)
  })
  it('should not be able to get property if property not exists', async () => {
    const propertyId = randomUUID()

    await expect(() =>
      sut.execute({
        id: propertyId,
      }),
    ).rejects.toBeInstanceOf(PropertyNotExistsError)
  })
})
