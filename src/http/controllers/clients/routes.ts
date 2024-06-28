import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createClient } from "./create";

export async function clientsRoutes(app: FastifyInstance) {
  app.post('/client', {onRequest: [verifyJwt]}, createClient);
}