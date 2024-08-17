import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ServerResponsesModule } from '../server-responses/server-responses.module';
// import { CreateUserDto } from './dto/create-user.dto';
// import { User } from '@prisma/client';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  // let testUser: User;
  // const testUserData: CreateUserDto = {
  //   // id: null,
  //   name: 'testUser',
  //   fantasyName: null,
  //   email: 'testUser@test.com',
  //   password: 'testUser159',
  //   CPF: '57489757482',
  //   CNPJ: '12.345.678/0003-00',
  //   phoneNumberFirst: '+5581986432490',
  //   phoneNumberSecond: '+5581986432491',
  //   phoneNumberThird: '+5581986432492',
  //   address: {
  //     city: 'Natal',
  //     country: 'Brasil',
  //     neighborhood: 'Alguma Coisa',
  //     number: '1558',
  //     street: 'Rua tal',
  //     complement: 'Condomínio',
  //   },
  //   // active: false,
  //   // products: null,
  //   // clients: null,
  //   // orders: null,
  // };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      imports: [ServerResponsesModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllBy: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn().mockResolvedValue({
              message: 'Registro removido com sucesso',
              // user: testUserData,
            }),
            deactivateById: jest.fn(),
            activateById: jest.fn(),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  // TESTS
  describe('delete', () => {});
  // describe('', async () => { });
  // describe('', async () => { });
  // describe('', async () => { });
  // describe('', async () => { });
});
