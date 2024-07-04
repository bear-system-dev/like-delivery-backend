import { ApiProperty } from '@nestjs/swagger';

export class PaginateUserQueries {
  @ApiProperty({ example: 'Manoel Silva' })
  filter?: string;

  @ApiProperty({ example: 7 })
  limit?: number;

  @ApiProperty({ example: 1 })
  page?: number;

  @ApiProperty({
    description:
      'Ordem de organização, baseado no banco de dados, do nome dos usuários retornados',
    enum: { asc: 'asc', desc: 'desc' },
    example: 'desc',
  })
  orderDirection?: 'asc' | 'desc';

  @ApiProperty({
    description: 'O tipo de dado o qual você quer pesquisar',
    enum: {
      cpf: 'cpf',
      cnpj: 'cnpj',
      email: 'email',
      fantasy_name: 'fantasy_name',
      name: 'name',
    },
    examples: ['cpf', 'email', 'fantasy_name'],
  })
  searchFor?: 'cpf' | 'cnpj' | 'email' | 'fantasy_name' | 'name';
}
