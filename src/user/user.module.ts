import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from 'src/role/role.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserProcedure } from './user.procedure';
import { TrpcModule } from 'src/trpc/trpc.module';

@Module({
  imports: [
    RoleModule,
    TrpcModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    })],
  exports: [UserProcedure, UserService],
  controllers: [UserController],
  providers: [
    UserService,
    UserProcedure,
  ],
})
export class UserModule { }
