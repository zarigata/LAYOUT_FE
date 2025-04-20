import axios from 'axios';
import env from './env.js';

/**
 * @codex
 * Axios client for interacting with local Ollama server
 */
const ollamaClient = axios.create({
  baseURL: `http://${env.ollama.host}:${env.ollama.port}`,
});

export default ollamaClient;
