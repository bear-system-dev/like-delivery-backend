import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseMdodule } from './database/database.module';

@Module({
  imports: [UsersModule, DatabaseMdodule],
  controllers: [],
  providers: [],
})
export class AppModule {}
