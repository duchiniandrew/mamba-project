import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';
import { UserModule } from './user/user.module';
import { TrpcModule } from './trpc/trpc.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    CampaignModule,
    UserModule,
    TrpcModule,
    AuthModule,
    RoleModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
