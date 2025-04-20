// @codex
// CRUD operations for lessons
import prisma from '../prisma/client.js';

/** Fetch all lessons */
export async function getAllLessons() {
  return prisma.lesson.findMany();
}

/** Fetch a lesson by ID */
export async function getLessonById(id) {
  return prisma.lesson.findUnique({ where: { id: Number(id) } });
}

/** Create a new lesson */
export async function createLesson(data) {
  return prisma.lesson.create({
    data: { class: { connect: { id: Number(data.classId) } }, content: data.content }
  });
}

/** Update existing lesson */
export async function updateLesson(id, data) {
  return prisma.lesson.update({ where: { id: Number(id) }, data: { content: data.content } });
}

/** Delete a lesson */
export async function deleteLesson(id) {
  return prisma.lesson.delete({ where: { id: Number(id) } });
}
