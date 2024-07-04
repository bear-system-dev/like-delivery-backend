import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseMdodule } from 'src/database/database.module';
import { ServerResponsesModule } from 'src/server-responses/server-responses.module';

@Module({
  imports: [DatabaseMdodule, ServerResponsesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
