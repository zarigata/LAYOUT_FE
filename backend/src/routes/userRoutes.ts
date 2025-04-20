import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticate, authorize, AuthRequest } from '../middleware/authMiddleware';

const router = Router();
const prisma = new PrismaClient();

// Get all users (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user by ID (admin only)
router.get('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({ where: { id: Number(id) } });
  res.json(user);
});

// Create new user (admin only)
router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  const { name, email, role, password } = req.body;
  // password hashing handled in authRoutes
  try {
    const user = await prisma.user.create({ data: { name, email, role, passwordHash: password } });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: 'Unable to create user' });
  }
});

// Update user (admin only)
router.put('/:id', authenticate, authorize(['admin']), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const user = await prisma.user.update({ where: { id: Number(id) }, data });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'Unable to update user' });
  }
});

// Delete user (admin only)
router.delete('/:id', authenticate, authorize(['admin']), async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.status(204).send();
});

export default router;
