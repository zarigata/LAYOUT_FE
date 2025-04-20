/**
 * @codex
 * Restrict access to localhost only
 */
export async function onlyLocalhost(request, reply) {
  const ip = request.ip;
  if (ip !== '127.0.0.1' && ip !== '::1') {
    reply.code(403).send({ error: 'Forbidden' });
  }
}
