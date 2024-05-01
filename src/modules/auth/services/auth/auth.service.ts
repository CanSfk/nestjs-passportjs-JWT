import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  async validatedUser(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByUserName(userName);

    if (!user || user?.password !== pass)
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');

    const { password, username, ...result } = user;

    return result;
  }
}
