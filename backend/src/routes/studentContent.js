// @codex
// Routes for student-specific content (Student-only)
import { getClassesForStudent, getQuizzesForStudent, getLessonsForStudent } from '../services/studentContentService.js';

export default async function (fastify, opts) {
  fastify.get('/classes', async (request) => getClassesForStudent(request.user.id));
  fastify.get('/quizzes', async (request) => getQuizzesForStudent(request.user.id));
  fastify.get('/lessons', async (request) => getLessonsForStudent(request.user.id));
}
