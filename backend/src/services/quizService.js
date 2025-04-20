// @codex
// Business logic for Quiz operations, including AI generation
import prisma from '../prisma/client.js';
import ollamaClient from '../config/ollama.js';
import env from '../config/env.js';

/**
 * Fetch all quizzes
 */
export async function getAllQuizzes() {
  return prisma.quiz.findMany();
}

/**
 * Fetch quiz by ID
 */
export async function getQuizById(id) {
  return prisma.quiz.findUnique({ where: { id: Number(id) } });
}

/**
 * Create a new quiz
 */
export async function createQuiz(data) {
  return prisma.quiz.create({ data: {
    class: { connect: { id: Number(data.classId) } },
    questions: data.questions,
    difficulty: data.difficulty
  }});
}

/**
 * Update quiz contents
 */
export async function updateQuiz(id, data) {
  return prisma.quiz.update({
    where: { id: Number(id) },
    data: { questions: data.questions, difficulty: data.difficulty }
  });
}

/**
 * Delete a quiz
 */
export async function deleteQuiz(id) {
  return prisma.quiz.delete({ where: { id: Number(id) } });
}

/**
 * Generate a quiz via Ollama AI and save to DB
 */
export async function generateQuiz({ subject, difficulty, classId }) {
  const prompt = `Generate a ${difficulty} quiz for subject: ${subject}`;
  const response = await ollamaClient.post('/completions', {
    model: env.ollama.model,
    prompt
  });
  const questions = response.data;
  return prisma.quiz.create({ data: {
    class: { connect: { id: Number(classId) } },
    questions,
    difficulty
  }});
}
