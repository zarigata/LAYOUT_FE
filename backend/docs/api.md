# API Documentation (OpenAPI Style) - Educational Platform

## Authentication

### POST /api/auth/login
- **Desc:** Authenticate user and return JWT.
- **Request:**
  ```json
  { "email": "user@example.com", "password": "pass123" }
  ```
- **Response:**
  ```json
  { "token": "<jwt>", "user": { "id": 1, "role": "TEACHER", ... } }
  ```

### POST /api/auth/register
- **Desc:** Register new user.
- **Request:**
  ```json
  { "email": "new@user.com", "password": "pass123", "role": "STUDENT" }
  ```
- **Response:**
  ```json
  { "id": 2, "email": "new@user.com", "role": "STUDENT" }
  ```

---

## Students

### GET /api/students
- **Desc:** List all students (admin/teacher).
- **Response:** Array of student objects.

### GET /api/students/:id
- **Desc:** Get student by ID.

---

## Quizzes

### POST /api/quizzes/generate
- **Desc:** Generate quiz using AI (Ollama).
- **Request:**
  ```json
  { "classId": 1, "topic": "Algebra" }
  ```
- **Response:**
  ```json
  { "questions": ["What is 2 + 2?", "Solve for x: 2x = 8"] }
  ```

---

## Lessons

### GET /api/lessons/:classId
- **Desc:** Get lessons for a class.

---

## Analytics

### GET /api/analytics
- **Desc:** Get analytics data (teacher/admin).

---

## Tutor

### POST /api/tutor
- **Desc:** Send question to AI tutor.
- **Request:**
  ```json
  { "question": "How do I solve 2x = 8?" }
  ```
- **Response:**
  ```json
  { "answer": "To solve 2x = 8, divide both sides by 2: x = 4." }
  ```

---

## Classes

### GET /api/classes
- **Desc:** List all classes.

### POST /api/classes
- **Desc:** Create new class (teacher/admin).

---

## Admin

### GET /api/admin/users
- **Desc:** List all users (admin only).

---

## Errors
- **401:** Unauthorized
- **403:** Forbidden
- **404:** Not found
- **500:** Server error
