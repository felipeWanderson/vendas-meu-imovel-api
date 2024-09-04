import { BuilderNotExistsError } from '@/uses-cases/errors/builder-not-exists-error'
import { InvalidCredentialsError } from '@/uses-cases/errors/invalid-credentials-error'
import { PropertyNotExistsError } from '@/uses-cases/errors/property-not-exists-error'
import { makeUpdateBuilderUseCase } from '@/uses-cases/factories/make-update-builder-use-case'
import { makeUpdateUserUseCase } from '@/uses-cases/factories/make-update-user-use-case'
import { makeUpdatePropertyUseCase } from '@/uses-cases/factories/property/make-update-property-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateProperty(request: FastifyRequest, reply: FastifyReply) {

  const updatePropertyParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updatePropertBodySchema = z.object({
    name: z.string(),
    builder_id: z.string().uuid()
    .optional(),
    address: z.object({
      postalCode: z.string()
      .regex(/^\d{5}-?\d{3}$/, { message: 'CEP invalido' }).optional(),
      address1: z.string().optional(),
      address2: z.string().optional(),
      address3: z.string().optional(),
      neighborhood: z.string().optional(),
      city: z.string().optional(),
      state: z.string()
      .min(2, { message: 'Estado deve ter pelo menos 2 letras' })
      .max(2, {message: 'Estado deve ter pelo menos 2 letras'}).optional(),
    }).optional()
  })

  try {
    const { id } = updatePropertyParamsSchema.parse(request.params)

    const body = updatePropertBodySchema.parse(request.body)

    const updateProperty = makeUpdatePropertyUseCase()


    const property = await updateProperty.execute({ id, data: body })
    
    
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
    if (error instanceof PropertyNotExistsError) {
      return reply.status(400).send({
        message: error.message,
      })
    }

    throw error
  }
}
