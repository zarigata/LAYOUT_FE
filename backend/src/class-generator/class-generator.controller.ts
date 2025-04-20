// CODEX: Controller for Class Generator API
import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ClassGeneratorService } from './class-generator.service';
import { ClassGeneratorDto } from './dto/class-generator.dto';
import { validateOrReject } from 'class-validator';

@Controller('class-generator')
export class ClassGeneratorController {
  constructor(private readonly service: ClassGeneratorService) {}

  @Post('generate-content')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('TEACHER')
  async generateContent(@Body() dto: ClassGeneratorDto, @Req() req: any) {
    try {
      await validateOrReject(dto);
    } catch (e) {
      throw new HttpException('Invalid input', HttpStatus.BAD_REQUEST);
    }
    // CODEX: Only teachers can access
    if (!req.user || req.user.role !== 'TEACHER') {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    const content = await this.service.generateContent(dto);
    return { content };
  }
}
