import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    })],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule { }
