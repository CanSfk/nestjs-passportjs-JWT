import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validatedUser(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByUserName(userName);

    if (!user || user?.password !== pass)
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');

    const { password, username, ...result } = user;

    return result;
  }

  async login(user: any) {
    const payload = { name: user.name, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
