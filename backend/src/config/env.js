import 'dotenv/config';

/**
 * @codex
 * Load environment variables and export for app-wide use
 */
export default {
  databaseUrl: process.env.DATABASE_URL,
  ollama: {
    host: process.env.OLLAMA_HOST,
    port: process.env.OLLAMA_PORT,
    model: process.env.OLLAMA_MODEL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  server: {
    port: process.env.PORT || 4000,
  },
};
