import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { userRoutes } from './http/controllers/users/routes'
import { builderRoutes } from './http/controllers/builders/routes'
import { EXPIRES_IN_ACCESS_TOKEN_IN_TEXT } from './constants'
import { propertiesRoutes } from './http/controllers/properties/routes'
import { salesRoutes } from './http/controllers/sales/routes'
const EXPIRESIN_IN_MILLISECONDS = 1 * 60000 // 1 minute
export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: EXPIRES_IN_ACCESS_TOKEN_IN_TEXT,
  },
})
app.register(fastifyCookie)
app.register(userRoutes)
app.register(builderRoutes)
app.register(propertiesRoutes)
app.register(salesRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
