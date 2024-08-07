import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseMdodule } from './database/database.module';
import { ServerResponsesModule } from './server-responses/server-responses.module';
import { AuthModule } from './auth/auth.module';
import { BearHashingModule } from './bear-hashing/bear-hashing.module';

@Module({
  imports: [UsersModule, DatabaseMdodule, ServerResponsesModule, AuthModule, BearHashingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
