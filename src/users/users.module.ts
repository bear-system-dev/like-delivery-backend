import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseMdodule } from 'src/database/database.module';

@Module({
  imports: [DatabaseMdodule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
