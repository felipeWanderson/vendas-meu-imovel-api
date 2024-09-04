import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createBuilder } from './create'
import { updateBuilder } from './update'
import { showBuilder } from './show'
import { listBuilders } from './list'
import { desactivateBuilder } from './desactivate'



export async function builderRoutes(app: FastifyInstance) {
  app.post('/builder', {onRequest: [verifyJwt]}, createBuilder)
  app.put('/builder', {onRequest: [verifyJwt]}, updateBuilder)
  app.get('/builder/:id', {onRequest: [verifyJwt]}, showBuilder)
  app.get('/builders', {onRequest: [verifyJwt]}, listBuilders)
  app.delete('/builder/:id', {onRequest: [verifyJwt]}, desactivateBuilder)
}
