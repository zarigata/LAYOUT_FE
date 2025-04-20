// @codex
// Admin CRUD routes for user management (Admin-only, localhost)
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../services/userService.js';

export default async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    return getAllUsers();
  });

  fastify.get('/:id', async (request, reply) => {
    return getUserById(request.params.id);
  });

  fastify.post('/', async (request, reply) => {
    return createUser(request.body);
  });

  fastify.put('/:id', async (request, reply) => {
    return updateUser(request.params.id, request.body);
  });

  fastify.delete('/:id', async (request, reply) => {
    return deleteUser(request.params.id);
  });
}
