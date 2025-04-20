// @codex
// Main Fastify server entry point
// @codex
// Fastify server entry point with modular app export for testing
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import env from './config/env.js';
import prisma from './prisma/client.js';
// Route imports
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import classRoutes from './routes/classes.js';
import quizRoutes from './routes/quizzes.js';
import lessonRoutes from './routes/lessons.js';
import analyticsRoutes from './routes/analytics.js';
import tutorRoutes from './routes/tutor.js';
import adminRoutes from './routes/admin.js';
import studentContentRoutes from './routes/studentContent.js';
import { onlyLocalhost } from './middleware/localhost.js';

// Factory function for Fastify app
function buildApp() {
  // Create Fastify instance
  const app = Fastify({ logger: true });
  // Register plugins
  app.register(cors, { origin: true });
  app.register(helmet);
  app.register(rateLimit, { max: 100, timeWindow: '1 minute' });
  app.register(jwt, { secret: env.jwt.secret });
  // Decorate with Prisma and auth helpers
  app.decorate('prisma', prisma);
  app.decorate('authenticate', async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
  app.decorate('authorize', (role) => async (request, reply) => {
    if (request.user.role !== role) {
      reply.code(403).send({ error: 'Forbidden' });
    }
  });
  // Register routes
  app.register(authRoutes, { prefix: '/api/auth' });
  app.register(studentRoutes, { prefix: '/api/students', preHandler: [app.authenticate, app.authorize('TEACHER')] });
  app.register(classRoutes, { prefix: '/api/classes', preHandler: [app.authenticate, app.authorize('TEACHER')] });
  app.register(quizRoutes, { prefix: '/api/quizzes', preHandler: [app.authenticate, app.authorize('TEACHER')] });
  app.register(lessonRoutes, { prefix: '/api/lessons', preHandler: [app.authenticate, app.authorize('TEACHER')] });
  app.register(analyticsRoutes, { prefix: '/api/analytics', preHandler: [app.authenticate, app.authorize('TEACHER')] });
  app.register(tutorRoutes, { prefix: '/api/tutor', preHandler: [app.authenticate, app.authorize('STUDENT')] });
  app.register(studentContentRoutes, { prefix: '/api/student', preHandler: [app.authenticate, app.authorize('STUDENT')] });
  app.register(adminRoutes, { prefix: '/api/admin/users', preHandler: [app.authenticate, app.authorize('ADMIN'), onlyLocalhost] });
  return app;
}

// Only start server if run directly (not imported)
if (process.env.NODE_ENV !== 'test') {
  const app = buildApp();
  app.listen({ port: env.server.port, host: '0.0.0.0' })
    .then(() => {
      console.log(`Server listening on port ${env.server.port}`);
    })
    .catch(err => {
      app.log.error(err);
      process.exit(1);
    });
}

// Export factory for tests
export { buildApp };
