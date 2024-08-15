import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-guard.guard';
import { JwtStrategy } from './jwt.strategy';
import { ServerResponsesModule } from 'src/server-responses/server-responses.module';
import { BearHashingModule } from 'src/bear-hashing/bear-hashing.module';

@Module({
  imports: [
    UsersModule,
    ServerResponsesModule,
    BearHashingModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY ?? '',
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AuthModule {}
