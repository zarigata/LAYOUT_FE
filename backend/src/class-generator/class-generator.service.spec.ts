// CODEX: Unit tests for ClassGeneratorService
import { ClassGeneratorService } from './class-generator.service';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ClassGeneratorService', () => {
  let service: ClassGeneratorService;
  beforeEach(() => {
    service = new ClassGeneratorService();
  });
  it('should generate content from Ollama', async () => {
    mockedAxios.post.mockResolvedValue({ data: { response: 'AI content' } });
    const dto = { type: 'quiz', subject: 'Math', topic: 'Algebra', difficulty: 'easy' } as any;
    const result = await service.generateContent(dto);
    expect(result).toBe('AI content');
  });
  it('should throw on Ollama error', async () => {
    mockedAxios.post.mockRejectedValue(new Error('fail'));
    const dto = { type: 'quiz', subject: 'Math', topic: 'Algebra', difficulty: 'easy' } as any;
    await expect(service.generateContent(dto)).rejects.toThrow();
  });
});
