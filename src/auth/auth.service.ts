import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findUnique({ email });
    if (user instanceof Error) return new Error(user.message);
    if (password === user.password) return { password: 'SECRET_PASS', ...user };
    return null;
  }

  async login(payload: any) {
    return {
      access_token: this.jwtService.signAsync({
        userId: payload.sub,
        username: payload.username,
      }),
    };
  }
}
