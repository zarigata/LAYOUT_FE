# Ollama AI Integration

- Ollama runs locally as a Docker service.
- Default model: llama3.2 (editable in `/docker/ollama.config.json`).
- Config options:
  - `ip`: Bind address (default: 127.0.0.1)
  - `model`: AI model (llama3.2, etc.)
  - `style`: Reply style (e.g., socratic)
  - `prePrompt`: System prompt for AI behavior

## Usage
- Backend communicates with Ollama via HTTP API (`OLLAMA_API_URL`).
- Teachers use Class Generator; Students use AI Tutor.
- All AI processing is local. No external calls.
