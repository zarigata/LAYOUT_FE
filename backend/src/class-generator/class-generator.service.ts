// CODEX: Service for AI-Powered Class Generator using Ollama
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ClassGeneratorDto } from './dto/class-generator.dto';

@Injectable()
export class ClassGeneratorService {
  private readonly ollamaUrl = process.env.OLLAMA_API_URL || 'http://ollama:11434';
  private readonly model = process.env.OLLAMA_MODEL || 'llama3.2';

  async generateContent(dto: ClassGeneratorDto): Promise<string> {
    // CODEX: Construct the prompt
    const prompt = `Generate a ${dto.type} for ${dto.subject} on the topic of ${dto.topic} with ${dto.difficulty} difficulty, suitable for high school students.`;
    try {
      // CODEX: Call Ollama local API
      const response = await axios.post(`${this.ollamaUrl}/api/generate`, {
        model: this.model,
        prompt,
        stream: false
      }, {
        timeout: 120000,
      });
      if (response.data && response.data.response) {
        return response.data.response;
      }
      throw new HttpException('Invalid Ollama response', HttpStatus.BAD_GATEWAY);
    } catch (err) {
      throw new HttpException('Ollama generation failed', HttpStatus.BAD_GATEWAY);
    }
  }
}
