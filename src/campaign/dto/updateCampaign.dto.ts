import { PartialType } from '@nestjs/swagger';
import { CreateCampaignDto } from './createCampaign.dto';

export class UpdateCampaignDto extends PartialType(CreateCampaignDto) {}
