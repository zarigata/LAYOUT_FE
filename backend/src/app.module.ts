// CODEX: Main NestJS module
import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { ClassModule } from './modules/class.module';
import { GradeModule } from './modules/grade.module';
import { AiModule } from './modules/ai.module';
import { AdminModule } from './modules/admin.module';

@Module({
  imports: [AuthModule, UserModule, ClassModule, GradeModule, AiModule, AdminModule],
})
export class AppModule {}
