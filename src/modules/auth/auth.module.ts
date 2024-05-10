import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from '../users/services/users/users.service';
import { LocalStrategy } from './utils/local.strategy';
import { SessionSerializer } from './utils/session.serializier';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'SECRET_KEY',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    SessionSerializer,
    JwtStrategy,
  ],
})
export class AuthModule {}
