import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createProperty } from './create'
import { updateProperty } from './update'
import { showProperty } from './show'
import { desactivateProperty } from './desactivate'



export async function propertiesRoutes(app: FastifyInstance) {
  app.post('/property', {onRequest: [verifyJwt]}, createProperty  )
  app.put('/property/:id', {onRequest: [verifyJwt]}, updateProperty)
  app.get('/property/:id', {onRequest: [verifyJwt]}, showProperty)
  app.delete('/property/:id', {onRequest: [verifyJwt]}, desactivateProperty)
}
