# Changelog

## 2025-04-19

### Added
- `/backend`: Node.js + Express API with Prisma schema and migration scripts
- `backend/Dockerfile`: Multi-stage build for backend service
- `Dockerfile`: Front-end multi-stage build with Nginx
- `docker-compose.yml`: Orchestrates PostgreSQL, backend, and frontend services with persistent volume
- API routes for users, lessons, progress, AI interactions, trinkets, and authentication
- `.env.example`: Added environment variables for PostgreSQL, JWT, and Ollama model
- `README.md`: Documentation for setup, API endpoints, Docker, and deployment
- `CHANGELOG.md`: This changelog file
- `docs/dockerized_platform_architecture.png`: Placeholder for system architecture diagram

### Updated
- `login/page.tsx`: Integrated real authentication with backend API
- API client and auth utilities imported relatively
- Front-end components now fetch real data from backend services

### Fixed
- Resolved import path errors in `login/page.tsx`
