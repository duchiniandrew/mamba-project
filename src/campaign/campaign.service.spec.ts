import { Test, TestingModule } from '@nestjs/testing';
import campaignFactory from '../../test/factories/campaign';
import { PrismaService } from '../prisma.service';
import { CreateCampaignDto } from './dto/createCampaign.dto';
import { UpdateCampaignDto } from './dto/updateCampaign.dto';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { Category } from '@prisma/client';

describe('campaignService', () => {
  let service: CampaignService;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [
        CampaignService,
        PrismaService,
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  const campaigns = [
    campaignFactory.build({
        id: 1,
        name: 'Economic campaign',
        category: Category.ECONOMIC,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: true,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
    }),
    campaignFactory.build({
        id: 2,
        name: 'Environmental campaign',
        category: Category.ENVIRONMENTAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: true,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
    }),
    campaignFactory.build({
        id: 3,
        name: 'Political campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: true,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
    }),
  ]

  describe('findAll', () => {
    it('should return an array of campaign', async () => {
        const expectedResult = [{
            id: 1,
            name: 'Economic campaign',
            category: Category.ECONOMIC,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-03-31'),
            status: true,
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
        },
        {
            id: 2,
            name: 'Environmental campaign',
            category: Category.ENVIRONMENTAL,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-03-31'),
            status: true,
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
        },
        {
            id: 3,
            name: 'Political campaign',
            category: Category.POLITICAL,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-03-31'),
            status: true,
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
        }]

        jest.spyOn(prismaService.campaign, 'findMany').mockResolvedValueOnce(campaigns);
        expect(await service.findAll()).toStrictEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a specific campaign', async () => {
        const expectedResult = {
            id: 1,
            name: 'Economic campaign',
            category: Category.ECONOMIC,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-03-31'),
            status: true,
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
        }
        jest.spyOn(prismaService.campaign, 'findUnique').mockResolvedValueOnce(campaigns[0]);
        expect(await service.findOne(1)).toStrictEqual(expectedResult);
    });
  });
  describe('create', () => {
    it('should create campaign', async () => {
        const expectedResult = {
            id: 1,
            name: 'Economic campaign',
            category: Category.ECONOMIC,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-03-31'),
            status: true,
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
        }
        const createCampaignDto = new CreateCampaignDto({
            name: 'Economic campaign',
            category: Category.ECONOMIC,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-03-31'),
            status: true,
        });
        jest.spyOn(prismaService.campaign, 'create').mockResolvedValueOnce(campaigns[0]);
        expect(await service.create(createCampaignDto)).toStrictEqual(expectedResult);
    });
  });
  describe('update', () => {
    it('should create campaign', async () => {
        const expectedResult = {
            id: 1,
            name: 'Social campaign',
            category: Category.SOCIAL,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-06-31'),
            status: true,
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
        }
        const updateCampaignDto = new UpdateCampaignDto({
            category: Category.SOCIAL,
            name: "Social campaign",
            endDate: new Date('2024-06-31'),
        });
        const campaign = campaignFactory.build({
            id: 1,
            name: 'Social campaign',
            category: Category.SOCIAL,
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-06-31'),
            status: true,
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
        })
        jest.spyOn(prismaService.campaign, 'update').mockResolvedValueOnce(campaign);
        expect(await service.update(1, updateCampaignDto)).toStrictEqual(expectedResult);
    });
  });
});
