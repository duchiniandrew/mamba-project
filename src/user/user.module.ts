import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleModule } from '../role/role.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserProcedure } from './user.procedure';
import { TrpcModule } from '../trpc/trpc.module';

@Module({
  imports: [
    RoleModule,
    TrpcModule,
    PrismaModule,
  ],
  exports: [UserProcedure, UserService],
  controllers: [UserController],
  providers: [
    UserService,
    UserProcedure,
  ],
})
export class UserModule { }
