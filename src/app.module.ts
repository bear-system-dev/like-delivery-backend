import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseMdodule } from './database/database.module';
import { ServerResponsesModule } from './server-responses/server-responses.module';

@Module({
  imports: [UsersModule, DatabaseMdodule, ServerResponsesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
