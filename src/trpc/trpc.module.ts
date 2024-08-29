import { forwardRef, Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: ['.env', '.env.development'] }),
        PrismaModule,
        forwardRef(() => UserModule),
    ],
    exports: [TrpcService],
    controllers: [],
    providers: [
        TrpcService,
        TrpcRouter,
    ],
})
export class TrpcModule { }