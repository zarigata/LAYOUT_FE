// @codex
// Business logic for AI Tutor interactions
import ollamaClient from '../config/ollama.js';
import env from '../config/env.js';

/**
 * Guide student without giving direct answers
 * @param {{ question: string }} data
 * @returns {Promise<any>} Ollama response
 */
export async function getTutorResponse(data) {
  const prompt = `Guide the student to solve: ${data.question} without giving the answer.`;
  const response = await ollamaClient.post('/completions', {
    model: env.ollama.model,
    prompt,
  });
  return response.data;
}
