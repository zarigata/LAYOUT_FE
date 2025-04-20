// @codex
// Axios wrapper for API calls with JWT handling
// CODEX: API service using universal env utility for baseURL (Claude/ChatGPT compatible)
import axios from 'axios';
import getEnv from '../utils/env';

const api = axios.create({
  baseURL: getEnv('VITE_API_URL', 'http://localhost:3001/api'),
});

// Attach JWT token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Global response handler for unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// @codex
// Simple in-memory cache for /quizzes & /analytics (5 min TTL)
const CACHE_TTL = 5 * 60 * 1000;
const cache = {};
const originalGet = api.get.bind(api);

api.get = async (url, config) => {
  if ((url === '/quizzes' || url === '/analytics') && cache[url] && (Date.now() - cache[url].ts < CACHE_TTL)) {
    return { data: cache[url].data };
  }
  const res = await originalGet(url, config);
  if (url === '/quizzes' || url === '/analytics') {
    cache[url] = { data: res.data, ts: Date.now() };
  }
  return res;
};

export default api;
