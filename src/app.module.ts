import { Module } from '@nestjs/common';
import { CampaignModule } from './campaign/campaign.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CampaignModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
