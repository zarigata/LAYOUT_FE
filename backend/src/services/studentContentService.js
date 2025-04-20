// @codex
// Business logic for student-specific content retrieval
import prisma from '../prisma/client.js';

/**
 * Get classes the student is enrolled in
 */
export async function getClassesForStudent(userId) {
  return prisma.class.findMany({
    where: { students: { some: { userId } } },
    include: { teacher: true, students: true }
  });
}

/**
 * Get quizzes for student's classes
 */
export async function getQuizzesForStudent(userId) {
  return prisma.quiz.findMany({
    where: { class: { students: { some: { userId } } } }
  });
}

/**
 * Get lessons for student's classes
 */
export async function getLessonsForStudent(userId) {
  return prisma.lesson.findMany({
    where: { class: { students: { some: { userId } } } }
  });
}
