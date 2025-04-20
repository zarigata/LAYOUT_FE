/**
 * @codex
 * Role-based authorization middleware
 */
export const authorize = (role) => async (request, reply) => {
  const user = request.user;
  if (user.role !== role) {
    reply.code(403).send({ error: 'Forbidden' });
  }
};
