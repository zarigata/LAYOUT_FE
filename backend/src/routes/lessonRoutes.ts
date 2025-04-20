import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// Get all lessons
router.get('/', authenticate, async (req, res) => {
  const lessons = await prisma.lesson.findMany();
  res.json(lessons);
});

// Get lesson by ID
router.get('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const lesson = await prisma.lesson.findUnique({ where: { id: Number(id) } });
  res.json(lesson);
});

// Create lesson (teacher/admin)
router.post('/', authenticate, authorize(['teacher','admin']), async (req, res) => {
  const { title, description, content } = req.body;
  const createdBy = req.user!.userId;
  const lesson = await prisma.lesson.create({ data: { title, description, content, createdBy } });
  res.status(201).json(lesson);
});

// Update lesson (teacher/admin)
router.put('/:id', authenticate, authorize(['teacher','admin']), async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const lesson = await prisma.lesson.update({ where: { id: Number(id) }, data });
  res.json(lesson);
});

// Delete lesson (admin)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  await prisma.lesson.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

export default router;
