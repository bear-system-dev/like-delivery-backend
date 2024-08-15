import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ServerResponsesService } from 'src/server-responses/server-responses.service';
import { Response } from 'express';
import { BearHashingService } from 'src/bear-hashing/bear-hashing.service';
import { Public } from 'src/decorators/public-endpoint.decorator';
import { UserAddressDTO } from 'src/users/dto/user-address.dto';

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
    const userAddressDTO: UserAddressDTO = {
      city: '',
      country: '',
      neighborhood: '',
      number: '',
      street: '',
      complement: '',
    };
    if (!createUserDto.CNPJ && !createUserDto.CPF)
      errors.push('Você deve enviar o cpf ou cnpj do Usuário');
    if (!createUserDto.fantasyName && !createUserDto.name)
      errors.push('Você deve enviar o nome ou nome fantasia do Usuário');
    if (
      (createUserDto.fantasyName && createUserDto.name) ||
      (createUserDto.CNPJ && createUserDto.CPF) ||
      (createUserDto.fantasyName && createUserDto.CPF) ||
      (createUserDto.name && createUserDto.CNPJ)
    ) {
      errors.push(
        'Você só pode enviar CNPJ e NOME FANTASIA juntos, ou NOME e CPF',
      );
    }
    if (!createUserDto.email) errors.push('Você deve enviar o e-mail');
    if (!createUserDto.password) errors.push('Você deve enviar a senha');
    if (!createUserDto.address) errors.push('Você deve enviar o endereço');
    if (
      !createUserDto.phoneNumberFirst ||
      createUserDto.phoneNumberFirst === '' ||
      createUserDto.phoneNumberFirst.length <= 0
    )
      errors.push(
        'Você deve enviar pelo menos 1 de 3 números de telefone, envie phoneNumberFirst',
      );

    if (!createUserDto.address || typeof createUserDto.address === 'string') {
      errors.push('O endereço é obrigatório, envie o objeto address');
    }

    for (const item of Object.keys(userAddressDTO)) {
      console.log(item);
      if (item === 'complement') continue; // Complement é opcional
      if (
        !createUserDto.address[item] ||
        createUserDto.address[item] === '' ||
        createUserDto.address[item].length <= 0
      ) {
        errors.push(`Você deve enviar a chave ${item} no objeto address`);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const originalPassword = createUserDto.password;
    const hashedPassword = await this.bearHashing.hashData(
      createUserDto.password,
    );
    if (hashedPassword instanceof Error)
      return errors.push(hashedPassword.message);

    if (errors.length === 0) {
      const newUser = await this.usersService.create({
        ...createUserDto,
        password: hashedPassword ?? originalPassword,
      });
      if (newUser instanceof Error) {
        errors.push(newUser.message);
        return this.serverResponses.internalServerError(res, {
          mensagem: 'Erro ao gravar dados do usuário no banco de dados',
          errors,
        });
      }
      return this.serverResponses.created(res, {
        message: 'Usuário criado com sucesso',
        newUser,
      });
    }

    // Redundância
    return this.serverResponses.internalServerError(res, {
      mensagem: 'Erro grave ao criar usuário',
      errors,
    });
  }
}
