import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { UserAddressDTO } from './user-address.dto';

export class CreateUserDto {
  @ApiProperty({ required: false })
  id?: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({ required: true })
  address: UserAddressDTO;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  fantasyName?: string;

  @ApiProperty({ required: false })
  CPF?: string;

  @ApiProperty({ required: false })
  CNPJ?: string;

  @ApiProperty({ required: true })
  active?: boolean;

  @ApiProperty({ required: false })
  phoneNumberFirst: string;

  @ApiProperty({ required: true })
  phoneNumberSecond?: string;

  @ApiProperty({ required: true })
  phoneNumberThird?: string;

  @ApiProperty({ required: false })
  clients: Prisma.ClientCreateNestedManyWithoutUserInput;

  @ApiProperty({ required: false })
  products: Prisma.ProductCreateNestedManyWithoutUserInput;

  @ApiProperty({ required: false })
  orders: Prisma.OrderCreateNestedManyWithoutUserInput;
}
