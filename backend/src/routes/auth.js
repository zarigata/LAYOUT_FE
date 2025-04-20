// @codex
// Auth routes: register and login
import { registerUser, loginUser } from '../services/authService.js';

export default async function (fastify, opts) {
  fastify.post('/register', async (request, reply) => {
    try {
      const user = await registerUser(request.body);
      reply.code(201).send(user);
    } catch (err) {
      reply.code(400).send({ error: err.message });
    }
  });

  fastify.post('/login', async (request, reply) => {
    try {
      const user = await loginUser(request.body);
      const token = fastify.jwt.sign({ id: user.id, role: user.role });
      reply.send({ user, token });
    } catch (err) {
      reply.code(401).send({ error: 'Invalid credentials' });
    }
  });
}
