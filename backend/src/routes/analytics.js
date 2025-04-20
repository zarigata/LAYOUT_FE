// @codex
// Routes for analytics data (Teacher-only)
import { getAllAnalytics, getAnalyticsByStudent } from '../services/analyticsService.js';

export default async function (fastify, opts) {
  fastify.get('/', async (request, reply) => getAllAnalytics());
  fastify.get('/:studentId', async (request, reply) => getAnalyticsByStudent(request.params.studentId));
}
