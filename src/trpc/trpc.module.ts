import { forwardRef, Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcRouter } from './trpc.router';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
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