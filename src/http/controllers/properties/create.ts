import { BuilderNotExistsError } from '@/uses-cases/errors/builder-not-exists-error'
import { makeCreatePropertyUseCase } from '@/uses-cases/factories/property/make-create-property-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createProperty(request: FastifyRequest, reply: FastifyReply) {
  const createPropertyBodySchema = z.object({
    name: z.string({ required_error: 'Nome é obrigatorio' }),
    builder_id: z.string({ required_error: 'Construtora é obrigatorio' }).uuid({ message: 'Construtora é obrigatorio' }),
    address: z.object({
      postalCode: z.string({ required_error: 'CEP é obrigatorio' })
      .regex(/^\d{5}-?\d{3}$/, { message: 'CEP invalido' }),
      address1: z.string({ required_error: 'logadouro é obrigatorio' }),
      address2: z.string({ required_error: 'Numero é obrigatorio' }),
      address3: z.string().optional(),
      neighborhood: z.string({ required_error: 'Bairro é obrigatorio' }),
      city: z.string({ required_error: 'Cidade é obrigatorio' }),
      state: z.string({ required_error: 'Estado é obrigatorio' })
      .min(2, { message: 'Estado deve ter pelo menos 2 letras' })
      .max(2, {message: 'Estado deve ter pelo menos 2 letras'}),
    })
  })

  const { name, address, builder_id } =
  createPropertyBodySchema.parse(request.body)

  try {
    const createPropertyUseCase = makeCreatePropertyUseCase()

    const { property } = await createPropertyUseCase.execute({
      name,
      address,
      builder_id
    })


    return reply
      .status(200)
      .send({
        property
      })
  } catch (error) {
    if (error instanceof BuilderNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
