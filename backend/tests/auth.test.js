// @codex
// Tests for authentication routes
import request from 'supertest';
import { app } from '../src/index.js';

describe('Auth Routes', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('registers a new STUDENT user', async () => {
    const res = await request(app.server)
      .post('/api/auth/register')
      .send({ name: 'Test Student', email: 'teststudent@example.com', password: 'password123', role: 'STUDENT' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.role).toBe('STUDENT');
  });

  it('logs in an existing user', async () => {
    const res = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'teststudent@example.com', password: 'password123' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('teststudent@example.com');
  });

  it('fails login with invalid credentials', async () => {
    const res = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'wrong@example.com', password: 'wrongpass' });
    expect(res.statusCode).toBe(401);
  });
});
