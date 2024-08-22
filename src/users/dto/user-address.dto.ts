import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UserAddressDTO implements Prisma.AddressCreateInput {
  @ApiProperty({ required: true })
  city: string;

  @ApiProperty({ required: false, example: 'Apartamento' })
  complement?: string;

  @ApiProperty({ required: true })
  country: string;

  @ApiProperty({ required: true })
  state: string;

  @ApiProperty({ required: true })
  neighborhood: string;

  @ApiProperty({ required: true })
  number: string;

  @ApiProperty({ required: true })
  street: string;
}
