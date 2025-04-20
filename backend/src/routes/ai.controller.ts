// CODEX: AI integration API skeleton
import { Controller, Post, Body } from '@nestjs/common';

@Controller('ai')
export class AiController {
  @Post('generate')
  generateContent(@Body() body: any) {
    // CODEX: Call Ollama API for content generation
    return { content: 'AI generated content' };
  }
  @Post('tutor')
  aiTutor(@Body() body: any) {
    // CODEX: Call Ollama for Socratic AI tutor
    return { reply: 'AI tutor reply (hint, not answer)' };
  }
}
