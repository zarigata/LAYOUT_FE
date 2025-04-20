// @codex
// Route for AI Tutor interactions (Student-only)
import { getTutorResponse } from '../services/tutorService.js';

export default async function (fastify, opts) {
  fastify.post('/', async (request, reply) => {
    try {
      const response = await getTutorResponse(request.body);
      reply.send(response);
    } catch (err) {
      reply.code(500).send({ error: err.message });
    }
  });
}
