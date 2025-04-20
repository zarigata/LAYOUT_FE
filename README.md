# Feverducation Platform Skeleton

## Overview
A modular, production-ready educational platform skeleton for teachers, students, and admins. Features local AI integration (Ollama), PostgreSQL, TypeScript (React/NestJS), and Dockerized microservices.

## Features
- Teacher, Student, and Admin portals
- Local AI (Ollama) for class/tutor features
- Secure, role-based access
- PostgreSQL database (Prisma ORM)
- Fully containerized (Docker Compose)

## Directory Structure
```
/frontend        # React + TypeScript UI
/backend         # NestJS + TypeScript API
/db              # Prisma schema, migrations, seed
/docker          # Dockerfiles, configs
/docs            # Documentation, diagrams
```

## Quickstart
1. Copy `.env.example` to `.env` and fill values.
2. `docker-compose up --build`
3. Frontend: http://localhost:3000
   Backend: http://localhost:4000
   Admin: http://localhost:4000/admin (localhost-only)
   Ollama: http://localhost:11434

## Ollama Integration
- Ollama runs locally (default: llama3.2)
- Configurable via `/docker/ollama.config.json`

## Security
- JWT auth, role-based access
- Admin dashboard only on localhost
- Encrypted passwords, validated endpoints

## Documentation
- See `/docs/architecture.md` for system diagram
- `/docs/ollama-config.md` for AI integration details

---
