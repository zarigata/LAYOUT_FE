// @codex
// CRUD operations for user management (Admin only)
import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

/**
 * Fetch all users
 */
export async function getAllUsers() {
  return prisma.user.findMany();
}

/**
 * Fetch a user by ID
 */
export async function getUserById(id) {
  return prisma.user.findUnique({ where: { id: Number(id) } });
}

/**
 * Create a new user
 */
export async function createUser(data) {
  const hashed = await bcrypt.hash(data.password, 10);
  return prisma.user.create({ data: { ...data, password: hashed } });
}

/**
 * Update user details
 */
export async function updateUser(id, data) {
  if (data.password) data.password = await bcrypt.hash(data.password, 10);
  return prisma.user.update({ where: { id: Number(id) }, data });
}

/**
 * Delete a user
 */
export async function deleteUser(id) {
  return prisma.user.delete({ where: { id: Number(id) } });
}
