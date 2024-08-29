import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/request/createCampaign.dto';
import { UpdateCampaignDto } from './dto/request/updateCampaign.dto';
import campaignFactory from '../../test/factories/campaign';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { Category, Status } from '@prisma/client';
import { RequestError } from '../types';
import { PaginationDto } from '../common/pagination.dto';

describe('SectorController', () => {
  let controller: CampaignController;
  let campaignService: CampaignService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampaignController],
      providers: [CampaignService, PrismaService],
    }).compile();

    controller = module.get<CampaignController>(CampaignController);
    campaignService = module.get<CampaignService>(CampaignService);
  });

  describe('findAll', () => {
    it('should return an array of campaings', async () => {
      const expectedCampaigns = [
        campaignFactory.build({
          id: 1,
          name: 'Economic campaign',
          category: 'ECONOMIC',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
        campaignFactory.build({
          id: 2,
          name: 'Environmental campaign',
          category: 'ENVIRONMENTAL',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
        campaignFactory.build({
          id: 3,
          name: 'Political campaign',
          category: 'POLITICAL',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
      ];
      const campaigns = [
        campaignFactory.build({
          id: 1,
          name: 'Economic campaign',
          category: 'ECONOMIC',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
        campaignFactory.build({
          id: 2,
          name: 'Environmental campaign',
          category: 'ENVIRONMENTAL',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
        campaignFactory.build({
          id: 3,
          name: 'Political campaign',
          category: 'POLITICAL',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
      ];
      const paginationDto: PaginationDto = {
        skip: 10,
        take: 10,
      }
      jest.spyOn(campaignService, 'findAll').mockResolvedValueOnce(campaigns);
      expect(await controller.findAll(paginationDto)).toStrictEqual(expectedCampaigns);
    });
  });

  describe('findOne', () => {
    it('should return a campaign with id 1', async () => {
      const campaign = campaignFactory.build({
        id: 1,
        name: 'Economic campaign',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      const expected = {
        id: 1,
        name: 'Economic campaign',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      };
      jest.spyOn(campaignService, 'findOne').mockResolvedValueOnce(campaign);
      expect(await controller.findOne(1)).toStrictEqual(expected);
    });

    it('should try to retrieve a campaign that does not exist', async () => {
      const forcedError = new RequestError('Campaign not found', 404);
      const expectedError = new RequestError('Campaign not found', 404);
      jest.spyOn(campaignService, 'findOne').mockRejectedValueOnce(forcedError);
      expect(async () => await controller.findOne(3)).rejects.toThrow(
        expectedError,
      );
    });
  });

  describe('create', () => {
    it('should return the new sector', async () => {
      const campaign = campaignFactory.build({
        id: 3,
        name: 'Finance',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      const createCampaignDto: CreateCampaignDto = {
        name: 'Finance',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        category: Category.ECONOMIC,
        status: Status.ACTIVED,
      };
      const expectedResult = {
        id: 3,
        name: 'Finance',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      };
      jest.spyOn(campaignService, 'create').mockResolvedValueOnce(campaign);
      expect(await controller.create(createCampaignDto)).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('update', () => {
    it('should return the updated campaign', async () => {
      const campaign = campaignFactory.build({
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      const updateCampaignDto: UpdateCampaignDto = {
        name: 'Politics campaign',
        endDate: new Date('2024-08-31'),
        category: Category.POLITICAL,
      };
      const expectedResult = {
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      };
      jest.spyOn(campaignService, 'update').mockResolvedValueOnce(campaign);
      expect(await controller.update(3, updateCampaignDto)).toStrictEqual(
        expectedResult,
      );
    });

    it('should try to update a campaign that does not exist', async () => {
      const updateCampaignDto: UpdateCampaignDto = {
        name: 'Politics campaign',
        endDate: new Date('2024-08-31'),
        category: Category.POLITICAL,
      };
      const forcedError = new RequestError('Campaign not found', 404);
      const expectedError = new RequestError('Campaign not found', 404);
      jest.spyOn(campaignService, 'update').mockRejectedValueOnce(forcedError);
      expect(
        async () => await controller.update(30, updateCampaignDto),
      ).rejects.toThrow(expectedError);
    });
  });

  describe('delete', () => {
    it('should delete a campaign', async () => {
      const campaign = campaignFactory.build({
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });

      const expectedResult = campaignFactory.build({
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      jest.spyOn(campaignService, 'remove').mockResolvedValueOnce(campaign);
      expect(await controller.remove(3)).toStrictEqual(expectedResult);
    });

    it('should try to delete a campaign that does not exist', async () => {
      const forcedError = new RequestError('Campaign not found', 404);
      const expectedError = new RequestError('Campaign not found', 404);
      jest.spyOn(campaignService, 'remove').mockRejectedValueOnce(forcedError);
      expect(async () => await controller.remove(3)).rejects.toThrow(
        expectedError,
      );
    });
  });
});
