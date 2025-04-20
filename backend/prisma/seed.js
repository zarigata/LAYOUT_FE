// @codex
// Seed script to populate initial data for development
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Administrator',
      role: 'ADMIN',
    },
  });

  // Teacher user
  const teacherPassword = await bcrypt.hash('teacher123', 10);
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      password: teacherPassword,
      name: 'John Teacher',
      role: 'TEACHER',
    },
  });

  // Student user
  const studentPassword = await bcrypt.hash('student123', 10);
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: studentPassword,
      name: 'Jane Student',
      role: 'STUDENT',
    },
  });

  // Student profile
  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      grades: {},
      attendance: {},
    },
  });

  // Class
  const class1 = await prisma.class.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Math 101',
      teacherId: teacher.id,
      students: { connect: { id: student.id } },
    },
  });

  // Lesson
  await prisma.lesson.upsert({
    where: { id: 1 },
    update: {},
    create: {
      classId: class1.id,
      content: 'Introduction to Algebra',
    },
  });

  // Quiz
  await prisma.quiz.upsert({
    where: { id: 1 },
    update: {},
    create: {
      classId: class1.id,
      questions: [
        { question: 'What is 2 + 2?', choices: [2,3,4,5], answer: 4 },
        { question: 'Solve for x: 2x = 8', choices: [2,4,6,8], answer: 4 }
      ],
      difficulty: 'Easy',
    },
  });

  // Analytics
  await prisma.analytics.upsert({
    where: { id: 1 },
    update: {},
    create: {
      studentId: student.id,
      metrics: { strengths: ['Math'], weaknesses: [], trends: {} },
    },
  });

  console.log('🌱 Seed data created');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
