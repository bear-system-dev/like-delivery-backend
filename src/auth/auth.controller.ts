import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ServerResponsesService } from 'src/server-responses/server-responses.service';
import { Response } from 'express';
import { BearHashingService } from 'src/bear-hashing/bear-hashing.service';
import { Public } from 'src/decorators/public-endpoint.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly serverResponses: ServerResponsesService,
    private readonly bearHashing: BearHashingService,
  ) {}
  @Public()
  @Post('sign-in')
  async cadastrar(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const errors: Array<string> = [];

    if (!createUserDto.CNPJ && !createUserDto.CPF)
      errors.push('Você deve enviar o CPF ou CPNJ do Usuário');
    if (!createUserDto.fantasyName && !createUserDto.name)
      errors.push('Você deve enviar o Nome ou Nome Fantasia do Usuário');
    if (
      (createUserDto.fantasyName && createUserDto.name) ||
      (createUserDto.CNPJ && createUserDto.CPF)
    ) {
      errors.push(
        'Você não pode enviar CNPJ e CPF juntos, ou Nome e Nome Fantasia',
      );
    }
    if (!createUserDto.email) errors.push('Você deve enviar o e-mail');
    if (!createUserDto.password) errors.push('Você deve enviar a senha');
    if (!createUserDto.address) errors.push('Você deve enviar o endereço');
    if (
      !createUserDto.phones ||
      createUserDto.phones.length === 0 ||
      createUserDto.phones.length > 3
    )
      errors.push('Você deve enviar entre 1 e 3 números de telefone');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const originalPassword = createUserDto.password;
    const hashedPassword = await this.bearHashing.hashData(
      createUserDto.password,
    );
    if (hashedPassword instanceof Error) errors.push(hashedPassword.message);

    if (errors.length === 0) {
      const newUser = await this.usersService.create(createUserDto);
      if (newUser instanceof Error) return errors.push(newUser.message);
      return this.serverResponses.created(res, {
        message: 'Usuário criado com sucesso',
        newUser,
      });
    }

    return this.serverResponses.internalServerError(res, {
      mensagem: 'Erro grave ao criar usuário',
      errors,
    });
  }
}
