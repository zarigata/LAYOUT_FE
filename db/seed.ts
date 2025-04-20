// CODEX: Seed script for Feverducation Platform
import { PrismaClient, Role } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create admin
  await prisma.user.create({
    data: {
      email: 'admin@feverducation.local',
      password: 'hashed_admin_password', // CODEX: Replace with hash in real use
      name: 'Admin',
      role: Role.ADMIN,
    },
  });
  // Create teacher
  await prisma.user.create({
    data: {
      email: 'teacher@feverducation.local',
      password: 'hashed_teacher_password',
      name: 'Teacher',
      role: Role.TEACHER,
    },
  });
  // Create student
  await prisma.user.create({
    data: {
      email: 'student@feverducation.local',
      password: 'hashed_student_password',
      name: 'Student',
      role: Role.STUDENT,
    },
  });
}

main().finally(() => prisma.$disconnect());
