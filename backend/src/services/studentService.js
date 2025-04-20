// @codex
// CRUD operations for Student profiles
import prisma from '../prisma/client.js';

/**
 * Fetch all students with user info
 */
export async function getAllStudents() {
  return prisma.student.findMany({ include: { user: true } });
}

/**
 * Fetch a single student by ID
 */
export async function getStudentById(id) {
  return prisma.student.findUnique({ where: { id: Number(id) }, include: { user: true } });
}

/**
 * Create a new student profile
 */
export async function createStudent(data) {
  return prisma.student.create({
    data: {
      user: { connect: { id: Number(data.userId) } },
      grades: data.grades || {},
      attendance: data.attendance || {}
    }
  });
}

/**
 * Update an existing student profile
 */
export async function updateStudent(id, data) {
  return prisma.student.update({
    where: { id: Number(id) },
    data: { grades: data.grades, attendance: data.attendance }
  });
}

/**
 * Delete a student profile
 */
export async function deleteStudent(id) {
  return prisma.student.delete({ where: { id: Number(id) } });
}
