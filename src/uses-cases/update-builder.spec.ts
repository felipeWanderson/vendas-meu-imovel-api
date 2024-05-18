import { expect, describe, it, beforeEach } from 'vitest'
import { randomUUID } from 'crypto'
import { InMemoryBuildersRepository } from '@/repositories/in-memory/in-memory-builder-repository'
import { UpdateBuilderUseCase } from './update-builder'
import { BuilderNotExistsError } from './errors/builder-not-exists-error'

let buildersRepository: InMemoryBuildersRepository
let sut: UpdateBuilderUseCase

describe('Update BuilderUse Case', () => {
  beforeEach(() => {
    buildersRepository = new InMemoryBuildersRepository()
    sut = new UpdateBuilderUseCase(buildersRepository)
  })
  it('should to update User', async () => {
    const builder = await buildersRepository.create({
      name: 'Builder 1',
      document: '12345678910',
    })

    const payloadUpdatebuilder = {
      document: '12345678999',
    }
    const builderUpdated = await sut.execute({
      id: builder.id,
      data: payloadUpdatebuilder,
    })

    expect(builderUpdated.document).toEqual('12345678999')
  })

  it('should not be able to update builder if user not exists', async () => {
    const builderId = randomUUID()

    const payloadUpdatebuilder = {
      document: '12345678999',
    }

    await expect(() =>
      sut.execute({
        id: builderId,
        data: payloadUpdatebuilder,
      }),
    ).rejects.toBeInstanceOf(BuilderNotExistsError)
  })
})
