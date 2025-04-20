// @codex
// Business logic for user authentication
import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

/**
 * Register a new user
 * @param {{ email: string, password: string, name: string, role: string }} data
 * @returns {Promise<object>} created user (without password)
 */
export async function registerUser(data) {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
    data: { email: data.email, password: hashed, name: data.name, role: data.role }
  });
  const { password, ...rest } = user;
  return rest;
}

/**
 * Authenticate user and validate credentials
 * @param {{ email: string, password: string }} data
 * @returns {Promise<object>} user object
 */
export async function loginUser(data) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new Error('Invalid credentials');
  const valid = await bcrypt.compare(data.password, user.password);
  if (!valid) throw new Error('Invalid credentials');
  const { password, ...rest } = user;
  return rest;
}
