import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { LocalAuthGuard } from '../../utils/local-auth.guard';
import { AuthenticatedGuard } from '../../utils/authenticated.guard';
import { Request } from 'express';
import { JwtAuthGuard } from '../../utils/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request): any {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req: Request) {
    return {
      msg: 'Hello this is protected area',
      user: req.user,
    };
  }
}
