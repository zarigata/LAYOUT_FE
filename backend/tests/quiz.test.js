// CODEX: Educational Platform - Quiz API Test Suite
// This test covers quiz generation endpoint, including success and error handling.
const request = require('supertest');
const { buildApp } = require('../src/index');

let app;

beforeAll(async () => {
  app = await buildApp();
});

describe('Quiz API', () => {
  it('should generate a quiz successfully', async () => {
    const res = await request(app.server)
      .post('/api/quizzes/generate')
      .send({ classId: 1, topic: 'Algebra' })
      .set('Authorization', `Bearer test_teacher_jwt`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('questions');
    expect(Array.isArray(res.body.questions)).toBe(true);
  });

  it('should return error for invalid class', async () => {
    const res = await request(app.server)
      .post('/api/quizzes/generate')
      .send({ classId: 99999, topic: 'Algebra' })
      .set('Authorization', `Bearer test_teacher_jwt`);
    expect(res.statusCode).toBe(400);
  });
});
