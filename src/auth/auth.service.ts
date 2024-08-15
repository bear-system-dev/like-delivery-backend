import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntrarDTO } from './dto/user-login.dto';
import { BearHashingService } from 'src/bear-hashing/bear-hashing.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly bearHashing: BearHashingService,
  ) {}

  async logIn(
    userId: string,
    rawPassword: string,
    payload: Partial<UserEntrarDTO>,
  ): Promise<object | Error> {
    try {
      const isPassEqual = await this.bearHashing.compareData(
        rawPassword,
        payload.password,
      );
      if (isPassEqual instanceof Error) {
        return new Error(isPassEqual.message);
      }
      console.log('isPassEqual: ', isPassEqual);
      if (!isPassEqual) return new Error('Senha incorreta');
      const access_token = await this.jwtService.signAsync({
        userId,
        username: payload.userName,
      });
      console.log('access_data: ', access_token);
      return { userId, username: payload.userName, access_token };
    } catch {
      return new Error('Erro grave ao gerar token de acesso');
    }
  }
}
