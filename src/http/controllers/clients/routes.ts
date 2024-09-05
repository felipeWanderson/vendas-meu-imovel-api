import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createClient } from "./create";
import { updateClient } from "./update";
import { verifyClient } from "./verify";

export async function clientsRoutes(app: FastifyInstance) {
  app.post('/client/verify', {onRequest: [verifyJwt]}, verifyClient);
  app.post('/client', {onRequest: [verifyJwt]}, createClient);
  app.put('/client/:id', {onRequest: [verifyJwt]}, updateClient);
}