import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import userRouter from './routes/userRoutes';
import lessonRouter from './routes/lessonRoutes';
import progressRouter from './routes/progressRoutes';
import aiRouter from './routes/aiRoutes';
import trinketRouter from './routes/trinketRoutes';
import authRouter from './routes/authRoutes';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/lessons', lessonRouter);
app.use('/api/progress', progressRouter);
app.use('/api/ai', aiRouter);
app.use('/api/trinkets', trinketRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
