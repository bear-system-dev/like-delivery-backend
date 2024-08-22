import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { ServerResponsesService } from 'src/server-responses/server-responses.service';
import { Response } from 'express';
import { BearHashingService } from 'src/bear-hashing/bear-hashing.service';
import { Public } from 'src/decorators/public-endpoint.decorator';
import { UserAddressDTO } from 'src/users/dto/user-address.dto';
import { UserEntrarDTO } from './dto/user-login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly serverResponses: ServerResponsesService,
    private readonly bearHashing: BearHashingService,
  ) {}
  @ApiResponse({
    description: 'Retorna os dados do usuário criados do usuário',
    schema: {
      default: {
        message: 'Usuário criado com sucesso',
        newUser: {},
      },
    },
    status: 201,
  })
  @ApiResponse({
    description:
      'Erro no banco de dados no item-1, ou erros de validação no item-2. (Um por vez)',
    schema: {
      default: [
        {
          mensagem: 'Erro ao gravar dados do usuário no banco de dados',
          errors: ['erro1', 'erro2', '...'],
        },
        {
          mensagem: 'Erro grave ao criar usuário',
          errors: ['erro1', 'erro2', '...'],
        },
      ],
    },
    status: 500,
  })
  @Public()
  @Post('sign-up')
  async cadastrar(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const errors: Array<string> = [];
    const userAddressDTO: UserAddressDTO = {
      city: '',
      country: '',
      neighborhood: '',
      number: '',
      street: '',
      complement: '',
      state: '',
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
        email: createUserDto.email.toLowerCase(),
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

    return this.serverResponses.internalServerError(res, {
      mensagem: 'Erro grave ao criar usuário',
      errors,
    });
  }

  @ApiResponse({
    description:
      'Retorna os dados para acesso ao sistema se feito login corretamente',
    schema: {
      default: {
        message: 'Usuário entrou com sucesso',
        access_data: {},
      },
    },
    status: 200,
  })
  @ApiResponse({
    description:
      'Erro se não fornecer o e-mail ou senha no item-1, ou se o e-mail não tiver cadastro no item-2. (Um por vez)',
    schema: {
      default: [
        {
          message: 'Você deve fornecer email e password',
        },
        {
          message: 'E-mail informado incorreto, verifique e tente novamente',
          email: 'email@fornecido.com',
        },
      ],
    },
    status: 400,
  })
  @ApiResponse({
    description:
      'Erro ao buscar e-mail no banco no item-1, ou se não gerar os dados de acesso no item-2. (Um por vez)',
    schema: {
      default: [
        {
          message: 'Um erro ocorreu o buscar registro',
        },
        {
          message: 'Erro grave ao gerar token de acesso',
        },
      ],
    },
    status: 500,
  })
  @Public()
  @Post('log-in')
  async entrar(@Body() userEntrarDTO: UserEntrarDTO, @Res() res: Response) {
    const { email, password } = userEntrarDTO;
    if (
      !email ||
      email === '' ||
      email.length <= 0 ||
      !password ||
      password === '' ||
      password.length <= 0
    ) {
      return this.serverResponses.badRequest(res, {
        message: 'Você deve fornecer email e password',
      });
    }
    const verEmail = await this.usersService.findUnique({
      email: email.toLowerCase(),
    });
    if (verEmail instanceof Error)
      return this.serverResponses.internalServerError(res, {
        message: verEmail.message,
      });
    if (!verEmail)
      return this.serverResponses.badRequest(res, {
        message: 'E-mail informado incorreto, verifique e tente novamente',
        email,
      });

    const access_data = await this.authService.logIn(verEmail.id, password, {
      email: email.toLowerCase(),
      password: verEmail.password,
      userName: verEmail.name ?? verEmail.fantasyName,
    });

    if (access_data instanceof Error) {
      return this.serverResponses.internalServerError(res, {
        message: access_data.message,
      });
    }

    return this.serverResponses.ok(res, {
      message: 'Usuário entrou com sucesso',
      access_data,
    });
  }
}
