import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  fantasyName?: string;

  @ApiProperty({ required: true })
  address: string;

  @ApiProperty({ required: false })
  CPF?: string;

  @ApiProperty({ required: false })
  CNPJ?: string;

  @ApiProperty({ required: true })
  active?: boolean;

  @ApiProperty({ required: false })
  phones: Prisma.PhoneNumberCreateNestedManyWithoutUserInput;

  @ApiProperty({ required: false })
  clients: Prisma.ClientCreateNestedManyWithoutUserInput;

  @ApiProperty({ required: false })
  products: Prisma.ProductCreateNestedManyWithoutUserInput;

  @ApiProperty({ required: false })
  orders: Prisma.OrderCreateNestedManyWithoutUserInput;
}
