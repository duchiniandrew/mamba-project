import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';
import { UserModule } from './user/user.module';
import { TrpcModule } from './trpc/trpc.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [CampaignModule, UserModule, TrpcModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
