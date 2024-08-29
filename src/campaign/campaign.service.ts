import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/request/createCampaign.dto';
import { UpdateCampaignDto } from './dto/request/updateCampaign.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from '../types';
import { Campaigns, Status } from '@prisma/client';
import { CampaignEntity } from './dto/response/campaignEntity';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) { }

  async create(createCampaignDto: CreateCampaignDto): Promise<CampaignEntity> {
    if (createCampaignDto.endDate.getTime() < new Date().getTime())
      createCampaignDto.status = Status.EXPIRED;
    const campaign = await this.prisma.campaigns.create({ data: createCampaignDto });
    return this.generateResponseDto(campaign);
  }

  async findAll(): Promise<CampaignEntity[]> {
    const campaign = await this.prisma.campaigns.findMany();
    return campaign.map(c => this.generateResponseDto(c));
  }

  async findOne(id: number): Promise<CampaignEntity> {
    const campaign = await this.prisma.campaigns.findUnique({ where: { id } });
    return this.generateResponseDto(campaign);
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto): Promise<CampaignEntity | RequestError> {
    try {
      const campaign = await this.prisma.campaigns.update({
        data: updateCampaignDto,
        where: { id },
      });
      return this.generateResponseDto(campaign);
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('Campaign not found', 404);
      }
    }
  }

  async remove(id: number): Promise<CampaignEntity | RequestError> {
    try {
      const campaign = await this.prisma.campaigns.delete({
        where: { id },
      });
      return this.generateResponseDto(campaign);
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('Campaign not found', 404);
      }
    }
  }

  private generateResponseDto(campaign: Campaigns): CampaignEntity {
    return new CampaignEntity(campaign)
  }
}
