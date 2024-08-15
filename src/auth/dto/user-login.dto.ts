import { ApiProperty } from '@nestjs/swagger';

export class UserEntrarDTO {
  @ApiProperty({ required: false })
  userName?: string;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  password: string;
}
