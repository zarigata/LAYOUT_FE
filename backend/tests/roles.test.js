// CODEX: Educational Platform - Role Middleware Test Suite
// This test verifies role-based access control middleware for teacher/student.
const request = require('supertest');
const { buildApp } = require('../src/index');

let app;
let teacherToken, studentToken;

beforeAll(async () => {
  app = await buildApp();
  await app.ready();
  // Login as teacher and student to get JWTs
  const teacherLogin = await request(app.server)
    .post('/api/auth/login')
    .send({ email: 'teacher@example.com', password: 'teacher123' });
  teacherToken = teacherLogin.body.token;
  const studentLogin = await request(app.server)
    .post('/api/auth/login')
    .send({ email: 'student@example.com', password: 'student123' });
  studentToken = studentLogin.body.token;
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
