# AI-Powered Class Generator

## Purpose
Generate quizzes, lessons, or tests using local AI (Ollama) for teachers.

## API Endpoint
`POST /api/class-generator/generate-content`

### Auth
- Requires JWT token (teacher role)

### Request Body
```
{
  "type": "quiz|lesson|test",
  "subject": "Math|Science|...",
  "topic": "Algebra|Photosynthesis|...",
  "difficulty": "easy|medium|hard"
}
```

### Example curl
```
curl -X POST http://localhost:3000/api/class-generator/generate-content \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"type":"quiz","subject":"Math","topic":"Algebra","difficulty":"medium"}'
```

### Response
```
{
  "content": "Quiz: Solve the following algebra equations..."
}
```

## Ollama Integration
- Runs locally, default model: llama3.2
- Configured via `/docker/ollama.config.json`
- Backend uses `OLLAMA_API_URL` (default: http://ollama:11434)

## Notes
- Endpoint restricted to authenticated teachers
- All AI processing is local (no external API)
- Input is validated and errors return HTTP 400/401
- Modular for future enhancements
