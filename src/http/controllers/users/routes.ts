import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { GetProfile } from './get-profile'
import { logout } from './logout'
import { verifyToken } from './verify'
import { updateUser } from './update-user'
import { verifyUserRole } from '@/http/middlewares/verify-user-roles'


export async function userRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions',authenticate)
  app.patch('/token/refresh', refresh)

  /** Authenticate */

  app.post('/logout', { onRequest: [verifyJwt] }, logout)
  app.get('/verify', { onRequest: [verifyJwt] }, verifyToken)
  app.get('/me', { onRequest: [verifyJwt] }, GetProfile)
  app.put('/update/:id',{ onRequest: [verifyJwt] }, updateUser)
  app.delete('/desactivate/:id', { onRequest: [verifyJwt, verifyUserRole('ADMIN')] }, updateUser)
}
