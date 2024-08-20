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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly serverResponses: ServerResponsesService,
  ) {}
  private readonly logger = new Logger(UsersController.name);

  @Get()
  async findAllBy(@Query() queries: PaginateUserQueries, @Res() res: Response) {
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
    } else if (!users || users.length < 1) {
      errors.push('Nenhum registro encontrado com essas informações');
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
    } else if (!user) {
      errors.push('Nenhum registro encontrado para esse ID');
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
    const user = await this.usersService.updateUnique({ id }, updateUserDto);
    if (user instanceof Error) {
      errors.push(user.message);
    } else if (!user) {
      errors.push('Nenhum registro encontrado para esse ID');
    } else if (!updateUserDto) {
      errors.push('Nenhum dado recebido. Envie os dados no body');
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registro encontrado com sucesso',
        user,
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
    } else if (!user) {
      errors.push('Nenhum registro encontrado para esse ID');
    } else {
      return await this.serverResponses.ok(res, {
        message: 'Registro removido com sucesso',
        user,
      });
    }
    return await this.serverResponses.internalServerError(res, {
      message: 'Erro ao remover registro',
      errors,
    });
  }

  @Post(':id/deactivate-user')
  async deactivateById(@Param('id') id: string, @Res() res: Response) {
    const errors: Array<string> = [];
    const user = await this.usersService.deactivateUnique({ id });
    if (user instanceof Error) {
      errors.push(user.message);
    } else if (!user) {
      errors.push('Nenhum registro encontrado para esse ID');
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

  @Post(':id/activate-user')
  async activateById(@Param('id') id: string, @Res() res: Response) {
    const errors: Array<string> = [];
    const user = await this.usersService.activateUnique({ id });
    if (user instanceof Error) {
      errors.push(user.message);
    } else if (!user) {
      errors.push('Nenhum registro encontrado para esse ID');
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
