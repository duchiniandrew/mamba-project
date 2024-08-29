import { Module } from '@nestjs/common';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [PrismaModule, AwsModule],
  controllers: [CampaignController],
  providers: [CampaignService],
})
export class CampaignModule {}
