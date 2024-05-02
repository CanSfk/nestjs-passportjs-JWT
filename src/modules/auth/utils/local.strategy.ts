import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(username: string, passport: string) {
    const user = await this.authService.validatedUser(username, passport);

    if (!user)
      throw new UnauthorizedException('User name or password is wrong!');

    return user;
  }
}
