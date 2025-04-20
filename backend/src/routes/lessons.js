// @codex
// CRUD routes for lessons (Teacher-only)
import { getAllLessons, getLessonById, createLesson, updateLesson, deleteLesson } from '../services/lessonService.js';

export default async function (fastify, opts) {
  fastify.get('/', async () => getAllLessons());
  fastify.get('/:id', async request => getLessonById(request.params.id));
  fastify.post('/', async request => createLesson(request.body));
  fastify.put('/:id', async request => updateLesson(request.params.id, request.body));
  fastify.delete('/:id', async request => deleteLesson(request.params.id));
}
