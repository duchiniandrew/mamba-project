import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';
import { UserModule } from './user/user.module';
import { TrpcModule } from './trpc/trpc.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    CampaignModule, 
    UserModule, 
    TrpcModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
