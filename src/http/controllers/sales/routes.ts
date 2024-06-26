import { verifyJwt } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createSaleNew } from "./create-sale-new";
import { createSaleUsed } from "./create-sale-used";
import { listSales } from "./list-sales";
import { updateSale } from "./update-sale";
import { deleteSale } from "./delete-sale";
import { getSaleById } from "./get-sale";
import { validateSale } from "./validate-sale";

export async function salesRoutes(app: FastifyInstance) {

  app.post('/sales/new', {onRequest: [verifyJwt]}, createSaleNew)
  app.post('/sales/used', {onRequest: [verifyJwt]}, createSaleUsed)
  app.get('/sales', {onRequest: [verifyJwt]}, listSales)
  app.get('/sale/:id', {onRequest: [verifyJwt]}, getSaleById)
  app.get('/validate-sale/:id', {onRequest: [verifyJwt]}, validateSale)
  app.put('/sale/:id', {onRequest: [verifyJwt]}, updateSale);
  app.delete('/sale/:id', {onRequest: [verifyJwt]}, deleteSale);
}