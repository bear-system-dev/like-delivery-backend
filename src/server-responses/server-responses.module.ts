import { Module } from '@nestjs/common';
import { ServerResponsesService } from './server-responses.service';

@Module({
  providers: [ServerResponsesService],
  exports: [ServerResponsesService],
})
export class ServerResponsesModule {}
