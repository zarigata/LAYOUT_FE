// @codex
// CRUD routes for classes (Teacher-only)
import { getAllClasses, getClassById, createClass, updateClass, deleteClass } from '../services/classService.js';

export default async function (fastify, opts) {
  fastify.get('/', async (request, reply) => getAllClasses());
  fastify.get('/:id', async (request, reply) => getClassById(request.params.id));
  fastify.post('/', async (request, reply) => createClass(request.body));
  fastify.put('/:id', async (request, reply) => updateClass(request.params.id, request.body));
  fastify.delete('/:id', async (request, reply) => deleteClass(request.params.id));
}
