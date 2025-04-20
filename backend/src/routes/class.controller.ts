// CODEX: Class management API skeleton
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('classes')
export class ClassController {
  @Get()
  getClasses() {
    // CODEX: Return list of classes
    return [];
  }
  @Post()
  createClass(@Body() body: any) {
    // CODEX: Create a new class
    return { status: 'created' };
  }
}
