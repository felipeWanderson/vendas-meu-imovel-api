import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { getRanking } from "./getRanking";

export async function rankingRoutes(app: FastifyInstance) {
  app.get('/ranking', {onRequest: [verifyJwt]}, getRanking);
}