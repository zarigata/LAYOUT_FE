// CODEX: Admin API skeleton
import { Controller, Get, Post, Body } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get('users')
  getUsers() {
    // CODEX: Return all users (admin only)
    return [];
  }
  @Post('user')
  createUser(@Body() body: any) {
    // CODEX: Create user (admin only)
    return { status: 'created' };
  }
}
