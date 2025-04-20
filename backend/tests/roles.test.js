// CODEX: Educational Platform - Role Middleware Test Suite
// This test verifies role-based access control middleware for teacher/student.
const request = require('supertest');
const { buildApp } = require('../src/index');

let app;

beforeAll(async () => {
  app = await buildApp();
});

describe('Role Middleware', () => {
  it('should allow teacher to access teacher route', async () => {
    const res = await request(app.server)
      .get('/api/classes/teacher')
      .set('Authorization', `Bearer test_teacher_jwt`);
    expect(res.statusCode).toBe(200);
  });

  it('should deny student access to teacher route', async () => {
    const res = await request(app.server)
      .get('/api/classes/teacher')
      .set('Authorization', `Bearer test_student_jwt`);
    expect(res.statusCode).toBe(403);
  });
});
