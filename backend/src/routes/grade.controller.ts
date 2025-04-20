// CODEX: Gradebook API skeleton
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('grades')
export class GradeController {
  @Get()
  getGrades() {
    // CODEX: Return grades
    return [];
  }
  @Post()
  setGrade(@Body() body: any) {
    // CODEX: Add/edit grade
    return { status: 'ok' };
  }
}
