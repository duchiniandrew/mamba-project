import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';
import { RoleService } from 'src/role/role.service';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [
    RoleModule,
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    })],
  controllers: [UserController],
  providers: [
    UserService,
    PrismaService,
    RoleService,
  ],
})
export class UserModule { }
