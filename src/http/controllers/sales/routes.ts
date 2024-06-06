import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createSaleNew } from "./create-sale-new";
import { createSaleUsed } from "./create-sale-used";

export async function salesRoutes(app: FastifyInstance) {

  app.post('/sales/new', {onRequest: [verifyJwt]}, createSaleNew)
  app.post('/sales/used', {onRequest: [verifyJwt]}, createSaleUsed)
}