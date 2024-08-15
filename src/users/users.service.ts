import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { PaginateUserQueries } from './dto/paginate-user-queries-dto';

const userDataIncludes: Prisma.UserInclude = {
  address: true,
  clients: true,
  orders: true,
  products: true,
  _count: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(UsersService.name);
  async create(createUserDto: CreateUserDto): Promise<Error | User> {
    const { city, complement, country, neighborhood, number, street } =
      createUserDto.address;
    try {
      const newUser = await this.prismaService.user.create({
        data: {
          ...createUserDto,
          address: {
            create: {
              city,
              complement,
              country,
              neighborhood,
              number,
              street,
            },
          },
        },
        include: userDataIncludes,
      });
      return newUser;
    } catch (error) {
      const msg = `Um erro ocorreu ao criar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  async findAllBy(queries: PaginateUserQueries): Promise<User[] | Error> {
    const { filter, limit, orderDirection, page, searchFor } = queries;
    switch (searchFor) {
      case 'cpf':
        const usersCPF: User[] | Error = await this.findAllByCPF({
          filter: filter || '',
          limit: limit || 7,
          page: page || 1,
          orderDirection: orderDirection || 'asc',
        });
        return usersCPF;
      case 'cnpj':
        const usersCNPJ: User[] | Error = await this.findAllByCNPJ({
          filter: filter || '',
          limit: limit || 7,
          page: page || 1,
          orderDirection: orderDirection || 'asc',
        });
        return usersCNPJ;
      case 'fantasy_name':
        const usersFantasyName: User[] | Error =
          await this.findAllByFantasyName({
            filter: filter || '',
            limit: limit || 7,
            page: page || 1,
            orderDirection: orderDirection || 'asc',
          });
        return usersFantasyName;
      case 'name':
        const usersName: User[] | Error = await this.findAllByName({
          filter: filter || '',
          limit: limit || 7,
          page: page || 1,
          orderDirection: orderDirection || 'asc',
        });
        return usersName;
      default:
        const usersEmail: User[] | Error = await this.findAllByEmail({
          filter: filter || '',
          limit: limit || 7,
          page: page || 1,
          orderDirection: orderDirection || 'asc',
        });
        return usersEmail;
    }
  }

  private async findAllByEmail(
    queries: PaginateUserQueries,
  ): Promise<Error | User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          email: {
            contains: queries.filter,
          },
        },
        orderBy: {
          email: queries.orderDirection,
        },
        take: queries.limit,
        skip: (queries.page - 1) * queries.limit,
        include: userDataIncludes,
      });
      return users;
    } catch (error) {
      const msg = `Um erro ocorreu o buscar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  private async findAllByName(
    queries: PaginateUserQueries,
  ): Promise<Error | User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          name: {
            contains: queries.filter,
          },
        },
        orderBy: {
          name: queries.orderDirection,
        },
        take: queries.limit,
        skip: (queries.page - 1) * queries.limit,
        include: userDataIncludes,
      });
      return users;
    } catch (error) {
      const msg = `Um erro ocorreu o buscar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  private async findAllByFantasyName(
    queries: PaginateUserQueries,
  ): Promise<Error | User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          fantasyName: {
            contains: queries.filter,
          },
        },
        orderBy: {
          fantasyName: queries.orderDirection,
        },
        take: queries.limit,
        skip: (queries.page - 1) * queries.limit,
        include: userDataIncludes,
      });
      return users;
    } catch (error) {
      const msg = `Um erro ocorreu o buscar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  private async findAllByCPF(
    queries: PaginateUserQueries,
  ): Promise<Error | User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          CPF: {
            contains: queries.filter,
          },
        },
        orderBy: {
          CPF: queries.orderDirection,
        },
        take: queries.limit,
        skip: (queries.page - 1) * queries.limit,
        include: userDataIncludes,
      });
      return users;
    } catch (error) {
      const msg = `Um erro ocorreu o buscar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  private async findAllByCNPJ(
    queries: PaginateUserQueries,
  ): Promise<Error | User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          CNPJ: {
            contains: queries.filter,
          },
        },
        orderBy: {
          CNPJ: queries.orderDirection,
        },
        take: queries.limit,
        skip: (queries.page - 1) * queries.limit,
        include: userDataIncludes,
      });
      return users;
    } catch (error) {
      const msg = `Um erro ocorreu o buscar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  async findUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Error | User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: userWhereUniqueInput,
        include: userDataIncludes,
      });
      return user;
    } catch (error) {
      const msg = `Um erro ocorreu o buscar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  async updateUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    updateUserDto: UpdateUserDto,
  ): Promise<Error | User> {
    const { city, complement, country, neighborhood, number, street } =
      updateUserDto.address;
    try {
      const updateUser = await this.prismaService.user.update({
        where: userWhereUniqueInput,
        data: {
          ...updateUserDto,
          address: {
            create: {
              city,
              complement,
              country,
              neighborhood,
              number,
              street,
            },
          },
        },
        include: userDataIncludes,
      });
      return updateUser;
    } catch (error) {
      const msg = `Um erro ocorreu o buscar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  async deleteUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Error | User> {
    try {
      const oldUser = await this.prismaService.user.delete({
        where: userWhereUniqueInput,
        include: userDataIncludes,
      });
      return oldUser;
    } catch (error) {
      const msg = `Um erro ocorreu o remover registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  async deactivateUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Error | User> {
    try {
      const deactivatedUser = await this.prismaService.user.update({
        where: userWhereUniqueInput,
        data: { active: false },
        include: userDataIncludes,
      });
      return deactivatedUser;
    } catch (error) {
      const msg = `Um erro ocorreu ao desativar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  async activateUnique(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Error | User> {
    try {
      const activatedUser = await this.prismaService.user.update({
        where: userWhereUniqueInput,
        data: { active: true },
        include: userDataIncludes,
      });
      return activatedUser;
    } catch (error) {
      const msg = `Um erro ocorreu ao ativar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }
}
