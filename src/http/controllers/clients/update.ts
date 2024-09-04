import { BuilderNotExistsError } from "@/uses-cases/errors/builder-not-exists-error"
import { PropertyNotExistsError } from "@/uses-cases/errors/property-not-exists-error"
import { makeUpdateClientUseCase } from "@/uses-cases/factories/property/make-update-client-use-case"
import { makeUpdatePropertyUseCase } from "@/uses-cases/factories/property/make-update-property-use-case"
import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"

export async function updateClient(request: FastifyRequest, reply: FastifyReply) {

  const updateClientParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const updateClientBodySchema = z.object({
    name: z.string().optional(),
    document: z.string().optional(),
  })

  try {
    const { id } = updateClientParamsSchema.parse(request.params)

    const body = updateClientBodySchema.parse(request.body)

    const updateClient = makeUpdateClientUseCase()


    const client = await updateClient.execute({ id, data: body })
    
    
    return reply
      .status(200)
      .send(client)
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