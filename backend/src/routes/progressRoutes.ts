import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// Get all progress records
router.get('/', authenticate, async (req, res) => {
  const records = await prisma.progress.findMany();
  res.json(records);
});

// Create progress record
router.post('/', authenticate, async (req, res) => {
  const { userId, lessonId, completionStatus, score } = req.body;
  const record = await prisma.progress.create({ data: { userId, lessonId, completionStatus, score } });
  res.status(201).json(record);
});

// Update progress
router.put('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const record = await prisma.progress.update({ where: { id: Number(id) }, data });
  res.json(record);
});

// Delete progress (admin only)
import { authorize } from '../middleware/authMiddleware';
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  await prisma.progress.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

export default router;
