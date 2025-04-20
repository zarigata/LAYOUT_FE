# Feverducation: AI-Powered Educational Platform

> CODEX: Full-stack classroom learning app for teachers and students, featuring Google-like minimalist UI, AI quiz/tutor, role-based access, and Dockerized deployment.

---

## Overview
- **Frontend:** React (ES2023), Tailwind CSS, i18next, Roboto font
- **Backend:** Node.js Fastify, Prisma ORM, PostgreSQL, Ollama AI (local server)
- **Auth:** JWT (admin, teacher, student roles)
- **Dockerized:** docker-compose for full stack
- **Testing:** Jest (backend), Vitest (frontend)
- **Localization:** English/Spanish

---

## Setup Instructions

### 1. Prerequisites
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)
- [Ollama](https://ollama.com/) running locally (`http://localhost:11434`)

### 2. Environment Variables
- Copy `.env.example` to `.env`
- Fill in:
  - `DATABASE_URL="postgresql://postgres:postgres@db:5432/appdb"`
  - `OLLAMA_HOST="localhost"`
  - `OLLAMA_PORT=11434`
  - `OLLAMA_MODEL=llama3.2`
  - `JWT_SECRET="your_jwt_secret"`

### 3. Run the Stack
```sh
docker-compose up --build
```

### 4. Migrate & Seed Database
```sh
docker exec -it <backend-container> npx prisma migrate dev --name init
docker exec -it <backend-container> npm run seed
```

### 5. Run Tests
```sh
docker exec -it <backend-container> npm test
docker exec -it <frontend-container> npm test
```

---

## Usage
- Frontend: [http://localhost:3000](http://localhost:3000)
- Log in as:
  - **Admin:** admin@example.com / admin123
  - **Teacher:** teacher@example.com / teacher123
  - **Student:** student@example.com / student123
- Switch language (EN/ES) in UI
- Try:
  - `/student/tutor` (AI tutor)
  - `/teacher/analytics` (charts)
  - `/student/quiz` (take quiz)
  - `/admin` (admin portal, localhost-only)

---

## Project Structure
- `backend/`: Fastify API, Prisma, seed, tests, docs
- `frontend/`: React UI, i18next, Tailwind, tests
- `.env.example`: Env template
- `docker-compose.yml`: Stack config

---

## Notes
- **Ollama** must be running locally for AI features.
- All code is cross-platform (Linux/Windows).
- Minimalist UI: white bg, #1a73e8 blue, Roboto, shadow-sm.

---

## License
MIT
