// @codex
// CRUD and AI generation routes for quizzes (Teacher-only)
import { getAllQuizzes, getQuizById, createQuiz, updateQuiz, deleteQuiz, generateQuiz } from '../services/quizService.js';

export default async function (fastify, opts) {
  fastify.get('/', async () => getAllQuizzes());
  fastify.get('/:id', async request => getQuizById(request.params.id));
  fastify.post('/', async request => createQuiz(request.body));
  fastify.put('/:id', async request => updateQuiz(request.params.id, request.body));
  fastify.delete('/:id', async request => deleteQuiz(request.params.id));
  fastify.post('/generate', async request => generateQuiz(request.body));
}
