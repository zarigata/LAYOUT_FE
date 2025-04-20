// @codex
// Business logic for Analytics operations
import prisma from '../prisma/client.js';

/**
 * Fetch all analytics records with student info
 */
export async function getAllAnalytics() {
  return prisma.analytics.findMany({ include: { student: true } });
}

/**
 * Fetch analytics for a specific student
 */
export async function getAnalyticsByStudent(studentId) {
  return prisma.analytics.findMany({ where: { studentId: Number(studentId) } });
}
