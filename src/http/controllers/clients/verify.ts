import { makeVerifyClientUseCase } from "@/uses-cases/factories/client/make-verfy-client-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function verifyClient(request: FastifyRequest, reply: FastifyReply) {
  const verfyClientBodySchema = z.object({
    document: z.string({ required_error: 'CPF/CNPJ é obrigatorio' }),
  })

  try {
    const { document } =
    verfyClientBodySchema.parse(request.body)

    const verifyClientUseCase = makeVerifyClientUseCase()

    const client = await verifyClientUseCase.execute({
      document
    })

    const response = {
      exists: !!client,
      clientId: client?.id
    }

    if (!client) {
      return reply
      .status(200)
      .send(response)
    }

    return reply
      .status(200)
      .send(response)
    
  } catch (error) {
    throw error
  }
}