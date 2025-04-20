/**
 * @codex
 * JWT authentication middleware
 */
export const authenticate = async (request, reply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({ error: 'Unauthorized' });
  }
};
