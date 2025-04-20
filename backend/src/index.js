// @codex
// Main Fastify server entry point
import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from 'fastify-helmet';
import rateLimit from 'fastify-rate-limit';
import jwt from 'fastify-jwt';
import env from './config/env.js';
import prisma from './prisma/client.js';

// Routes
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
// TODO: import classRoutes, quizRoutes, lessonRoutes, analyticsRoutes, adminRoutes

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
// TODO: register other routes with proper prefixes and middleware

const start = async () => {
  try {
    await app.listen({ port: env.server.port, host: '0.0.0.0' });
    console.log(`Server listening on port ${env.server.port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
