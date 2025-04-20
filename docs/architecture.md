# Architecture Diagram (Placeholder)

```
+-----------+       +----------+       +---------+      +--------+
| Frontend  | <-->  | Backend  | <-->  | DB      |      | Ollama |
| (React)   |       | (NestJS) |       | (PGSQL) |      | (AI)   |
+-----------+       +----------+       +---------+      +--------+
```

- All services are containerized via Docker Compose.
- Admin dashboard only accessible from localhost.
- Ollama runs locally for all AI features.

---
