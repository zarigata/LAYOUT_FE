// CODEX: Auth API skeleton
import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login(@Body() body: any) {
    // CODEX: Implement login logic (JWT)
    return { token: 'jwt_token' };
  }
  @Post('register')
  register(@Body() body: any) {
    // CODEX: Implement registration logic
    return { status: 'ok' };
  }
}
