import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CreateCampaignDto } from './dto/createCampaign.dto';
import { UpdateCampaignDto } from './dto/updateCampaign.dto';
import campaignFactory from '../../test/factories/campaign';
import { CampaignController } from './campaign.controller';
import { CampaignService } from './campaign.service';
import { Category } from '@prisma/client';

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
                    status: true,
                    updatedAt: new Date('2024-12-31'),
                    createdAt: new Date('2024-01-01'),
                }),
                campaignFactory.build({
                    id: 2,
                    name: 'Environmental campaign',
                    category: 'ENVIRONMENTAL',
                    startDate: new Date('2024-02-01'),
                    endDate: new Date('2024-03-31'),
                    status: true,
                    updatedAt: new Date('2024-12-31'),
                    createdAt: new Date('2024-01-01'),
                }),
                campaignFactory.build({
                    id: 3,
                    name: 'Political campaign',
                    category: 'POLITICAL',
                    startDate: new Date('2024-02-01'),
                    endDate: new Date('2024-03-31'),
                    status: true,
                    updatedAt: new Date('2024-12-31'),
                    createdAt: new Date('2024-01-01'),
                }),
            ];
            const campaigns = [{
                id: 1,
                name: 'Economic campaign',
                category: 'ECONOMIC',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-03-31'),
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            },
            {
                id: 2,
                name: 'Environmental campaign',
                category: 'ENVIRONMENTAL',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-03-31'),
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            },
            {
                id: 3,
                name: 'Political campaign',
                category: 'POLITICAL',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-03-31'),
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            }]
            jest.spyOn(campaignService, 'findAll').mockResolvedValueOnce(campaigns);
            expect(await controller.findAll()).toStrictEqual(expectedCampaigns);
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
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            });
            const expected = {
                id: 1,
                name: 'Economic campaign',
                category: 'ECONOMIC',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-03-31'),
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            }
            jest.spyOn(campaignService, 'findOne').mockResolvedValueOnce(campaign);
            expect(await controller.findOne(1)).toBe(expected);
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
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            });
            const createCampaignDto: CreateCampaignDto = {
                name: 'Finance',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-03-31'),
                category: Category.ECONOMIC,
                status: true,
            };
            const expectedResult = {
                id: 3,
                name: 'Finance',
                category: 'ECONOMIC',
                startDate: new Date('2024-02-01'),
                endDate: new Date('2024-03-31'),
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            }
            jest.spyOn(campaignService, 'create').mockResolvedValueOnce(campaign);
            expect(await controller.create(createCampaignDto)).toStrictEqual(expectedResult);
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
                status: true,
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
                status: true,
                updatedAt: new Date('2024-12-31'),
                createdAt: new Date('2024-01-01'),
            }
            jest.spyOn(campaignService, 'update').mockResolvedValueOnce(campaign);
            expect(await controller.update(3, updateCampaignDto)).toStrictEqual(expectedResult);
        });
    });

    describe('delete', () => {
        const updateCampaignDto: UpdateCampaignDto = {
            name: 'Financial Services',
        };

        it('should delete a camapign', async () => {
            const updatedSector = {
                ...campaigns[2],
                name: 'Financial Services',
            };
            jest.spyOn(campaignService, 'update').mockResolvedValueOnce(updatedSector);

            expect(await controller.update(3, updateCampaignDto)).toBe(updatedSector);
        });
    });
});
