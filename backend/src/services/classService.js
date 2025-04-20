// @codex
// Business logic for Class CRUD operations
import prisma from '../prisma/client.js';

/**
 * Fetch all classes
 */
export async function getAllClasses() {
  return prisma.class.findMany({ include: { teacher: true, students: true } });
}

/**
 * Fetch class by ID
 */
export async function getClassById(id) {
  return prisma.class.findUnique({ where: { id: Number(id) }, include: { teacher: true, students: true } });
}

/**
 * Create a new class
 */
export async function createClass(data) {
  return prisma.class.create({
    data: { name: data.name, teacher: { connect: { id: Number(data.teacherId) } } }
  });
}

/**
 * Update class details
 */
export async function updateClass(id, data) {
  return prisma.class.update({
    where: { id: Number(id) },
    data: { name: data.name }
  });
}

/**
 * Delete a class
 */
export async function deleteClass(id) {
  return prisma.class.delete({ where: { id: Number(id) } });
}
