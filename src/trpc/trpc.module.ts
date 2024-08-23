import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { UserService } from '../user/user.service';
import { UserProcedure } from '../user/user.procedure';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ['.env', '.env.development'] }),
        UserModule
    ],
    controllers: [],
    providers: [
        PrismaService,
        TrpcService,
        TrpcRouter,
        UserService,
        UserProcedure,
    ],
})
export class TrpcModule { }