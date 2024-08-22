import { ApiProperty } from '@nestjs/swagger';
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

  @ApiProperty({
    required: false,
    enum: ['MERCHANT', 'CONSUMER'],
    default: 'MERCHANT',
  })
  userRole?: 'MERCHANT' | 'CONSUMER';

  @ApiProperty({
    required: false,
    enum: ['OWNER', 'ADMIN'],
    default: 'OWNER',
  })
  merchantRole?: 'OWNER' | 'ADMIN';

  @ApiProperty({ required: true })
  active?: boolean;

  @ApiProperty({ required: false })
  phoneNumberFirst: string;

  @ApiProperty({ required: true })
  phoneNumberSecond?: string;

  @ApiProperty({ required: true })
  phoneNumberThird?: string;
}
