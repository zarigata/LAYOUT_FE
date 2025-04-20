// CODEX: DTO and validation for Class Generator
import { IsIn, IsString } from 'class-validator';

export class ClassGeneratorDto {
  @IsIn(['quiz', 'lesson', 'test'])
  type: string;

  @IsString()
  subject: string;

  @IsString()
  topic: string;

  @IsIn(['easy', 'medium', 'hard'])
  difficulty: string;
}
