import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// Log AI interaction
router.post('/log', authenticate, async (req, res) => {
  const { prompt, response } = req.body;
  const userId = req.user!.userId;
  const log = await prisma.aIInteraction.create({ data: { userId, prompt, response } });
  res.status(201).json(log);
});

// Get user interactions
router.get('/user', authenticate, async (req, res) => {
  const userId = req.user!.userId;
  const interactions = await prisma.aIInteraction.findMany({ where: { userId } });
  res.json(interactions);
});

export default router;
