import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// Get all trinkets
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  const trinkets = await prisma.trinket.findMany({ include: { user: true } });
  res.json(trinkets);
});

// Create trinket (admin)
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  const { name, description, userId } = req.body;
  const trinket = await prisma.trinket.create({ data: { name, description, userId } });
  res.status(201).json(trinket);
});

// Update trinket (admin)
router.put('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const trinket = await prisma.trinket.update({ where: { id: Number(id) }, data });
  res.json(trinket);
});

// Delete trinket (admin)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  await prisma.trinket.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

export default router;
