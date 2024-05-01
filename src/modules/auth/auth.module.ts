import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from '../users/services/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class AuthModule {}
