import { Category, Status } from '@prisma/client';
import { Factory } from 'fishery';
import { CampaignEntity } from '../../src/campaign/dto/response/campaignEntity';

export default Factory.define<CampaignEntity>(({ sequence, params }) => ({
  id: sequence,
  name: params.name || `name-${sequence}`,
  category: params.category || Category.ECONOMIC,
  startDate: new Date(),
  endDate: new Date(),
  status: params.status || Status.ACTIVED,
  updatedAt: new Date(),
  createdAt: new Date(),
}));
