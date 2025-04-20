// @codex
// Routes for managing student profiles (Teacher-only)
import { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } from '../services/studentService.js';

export default async function (fastify, opts) {
  fastify.get('/', async (request, reply) => {
    return getAllStudents();
  });

  fastify.get('/:id', async (request, reply) => {
    return getStudentById(request.params.id);
  });

  fastify.post('/', async (request, reply) => {
    return createStudent(request.body);
  });

  fastify.put('/:id', async (request, reply) => {
    return updateStudent(request.params.id, request.body);
  });

  fastify.delete('/:id', async (request, reply) => {
    return deleteStudent(request.params.id);
  });
}
