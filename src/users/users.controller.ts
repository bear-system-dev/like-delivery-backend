import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Res,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { ServerResponsesService } from 'src/server-responses/server-responses.service';
import { PaginateUserQueries } from './dto/paginate-user-queries-dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly serverResponses: ServerResponsesService,
  ) {}
  private readonly logger = new Logger(UsersController.name);

  @Get()
  async findAll(@Query() queries: PaginateUserQueries, @Res() res: Response) {
    const errors: Array<string> = [];
    const { filter, limit, orderDirection, page, searchFor } = queries;

    const users = await this.usersService.findAllBy({
      filter,
      limit,
      orderDirection,
      page,
      searchFor,
    });
    if (users instanceof Error) {
      errors.push(users.message);
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registros encontrados com sucesso',
        users,
      });
    }

    return await this.serverResponses.internalServerError(res, {
      message: 'Erro ao buscar registros',
      errors,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const errors: Array<string> = [];
    const user = await this.usersService.findUnique({ id });
    if (user instanceof Error) {
      errors.push(user.message);
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registro encontrado com sucesso',
        user,
      });
    }
    return await this.serverResponses.internalServerError(res, {
      message: 'Erro ao buscar registro',
      errors,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    const errors: Array<string> = [];
    const updatedUser = await this.usersService.updateUnique(
      { id },
      updateUserDto,
    );
    if (updatedUser instanceof Error) {
      errors.push(updatedUser.message);
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registro encontrado com sucesso',
        updatedUser,
      });
    }
    return await this.serverResponses.internalServerError(res, {
      message: 'Erro ao atualizar registro',
      errors,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const errors: Array<string> = [];
    const user = await this.usersService.deleteUnique({ id });
    if (user instanceof Error) {
      errors.push(user.message);
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registro encontrado com sucesso',
        user,
      });
    }
    return await this.serverResponses.internalServerError(res, {
      message: 'Erro ao buscar registro',
      errors,
    });
  }

  @Post(':id')
  async deactivateById(@Param('id') id: string, @Res() res: Response) {
    const errors: Array<string> = [];
    const user = await this.usersService.deactivateUnique({ id });
    if (user instanceof Error) {
      errors.push(user.message);
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registro desativado com sucesso',
        user,
      });
    }
    return await this.serverResponses.internalServerError(res, {
      message: 'Erro ao buscar registro',
      errors,
    });
  }

  @Post(':id')
  async activateById(@Param('id') id: string, @Res() res: Response) {
    const errors: Array<string> = [];
    const user = await this.usersService.activateUnique({ id });
    if (user instanceof Error) {
      errors.push(user.message);
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registro ativado com sucesso',
        user,
      });
    }
    return await this.serverResponses.internalServerError(res, {
      message: 'Erro ao buscar registro',
      errors,
    });
  }
}
