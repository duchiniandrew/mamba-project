import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, AwsModule, UserModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
