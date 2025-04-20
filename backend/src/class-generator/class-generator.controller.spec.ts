// CODEX: Unit tests for ClassGeneratorController
import { Test, TestingModule } from '@nestjs/testing';
import { ClassGeneratorController } from './class-generator.controller';
import { ClassGeneratorService } from './class-generator.service';
import { ClassGeneratorDto } from './dto/class-generator.dto';

describe('ClassGeneratorController', () => {
  let controller: ClassGeneratorController;
  let service: ClassGeneratorService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassGeneratorController],
      providers: [
        {
          provide: ClassGeneratorService,
          useValue: { generateContent: jest.fn().mockResolvedValue('AI content') },
        },
      ],
    }).compile();
    controller = module.get<ClassGeneratorController>(ClassGeneratorController);
    service = module.get<ClassGeneratorService>(ClassGeneratorService);
  });
  it('should return content for valid teacher', async () => {
    const dto = { type: 'quiz', subject: 'Math', topic: 'Algebra', difficulty: 'easy' } as ClassGeneratorDto;
    const req = { user: { role: 'TEACHER' } };
    const result = await controller.generateContent(dto, req);
    expect(result).toEqual({ content: 'AI content' });
  });
  it('should throw if not teacher', async () => {
    const dto = { type: 'quiz', subject: 'Math', topic: 'Algebra', difficulty: 'easy' } as ClassGeneratorDto;
    const req = { user: { role: 'STUDENT' } };
    await expect(controller.generateContent(dto, req)).rejects.toThrow();
  });
});
