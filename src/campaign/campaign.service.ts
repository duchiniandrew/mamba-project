import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCampaignDto } from './dto/createCampaign.dto';
import { UpdateCampaignDto } from './dto/updateCampaign.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from '../types';
import { Status } from '@prisma/client';
import { CampaignEntity } from './entity/campaign.entity';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) { }

  create(createCampaignDto: CreateCampaignDto): Promise<CampaignEntity> {
    if (createCampaignDto.endDate.getTime() < new Date().getTime())
      createCampaignDto.status = Status.EXPIRED;
    return this.prisma.campaign.create({ data: createCampaignDto });
  }

  findAll(): Promise<CampaignEntity[]> {
    return this.prisma.campaign.findMany();
  }

  findOne(id: number): Promise<CampaignEntity> {
    return this.prisma.campaign.findUnique({ where: { id } });
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto): Promise<CampaignEntity | RequestError> {
    try {
      const campaign = await this.prisma.campaign.update({
        data: updateCampaignDto,
        where: { id },
      });
      return campaign;
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('Campaign not found', 404);
      }
    }
  }

  async remove(id: number): Promise<CampaignEntity | RequestError> {
    try {
      const campaign = await this.prisma.campaign.delete({
        where: { id },
      });
      return campaign;
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('Campaign not found', 404);
      }
    }
  }
}
