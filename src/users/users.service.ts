import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { PaginateUserQueries } from './dto/paginate-user-queries-dto';

const userDataIncludes = {
  clients: true,
  orders: true,
  phones: true,
  products: true,
  _count: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(UsersService.name);
  async create(createUserDto: CreateUserDto): Promise<Error | User> {
    try {
      const newUser = await this.prismaService.user.create({
        data: createUserDto,
        include: userDataIncludes,
      });
      return newUser;
    } catch (error) {
      const msg = `Um erro ocorreu o criar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }

  async findAllByName(queries: PaginateUserQueries): Promise<Error | User[]> {
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

  async findAllByFantasyName(
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

  async findAllUnique(
    queries: PaginateUserQueries,
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Error | User[]> {
    try {
      const users = await this.prismaService.user.findMany({
        where: userWhereUniqueInput, // Tem que verificar se na chamada ele permite utiliza o contains: queries.filter. Senão vai ter que mudar
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
    try {
      const updateUser = await this.prismaService.user.update({
        where: userWhereUniqueInput,
        data: updateUserDto,
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
      const msg = `Um erro ocorreu o desativar registro`;
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
      const msg = `Um erro ocorreu o ativar registro`;
      this.logger.error(msg, error);
      return new Error(msg);
    }
  }
}
