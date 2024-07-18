import { Category } from '@prisma/client';
import { Factory } from 'fishery';
import { EntityCampaign } from 'src/campaign/entity/campaign.entity';

export default Factory.define<EntityCampaign>(({ sequence, params }) => ({
    id: sequence,
    name: params.name || `name-${sequence}`,
    category: params.category || Category.ECONOMIC,
    startDate: new Date(),
    endDate: new Date(),
    status: params.status || true,
    updatedAt: new Date(),
    createdAt: new Date(),
}));
