// CODEX: Module for Class Generator
import { Module } from '@nestjs/common';
import { ClassGeneratorService } from './class-generator.service';
import { ClassGeneratorController } from './class-generator.controller';
@Module({
  providers: [ClassGeneratorService],
  controllers: [ClassGeneratorController],
})
export class ClassGeneratorModule {}
