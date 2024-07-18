import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCampaignDto } from './dto/createCampaign.dto';
import { UpdateCampaignDto } from './dto/updateCampaign.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from './types';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService) {}

  create(createCampaignDto: CreateCampaignDto) {
    return this.prisma.campaign.create({ data: createCampaignDto });
  }

  findAll() {
    return this.prisma.campaign.findMany();
  }

  findOne(id: number) {
    return this.prisma.campaign.findUnique({ where: { id } });
  }

  async update(id: number, updateCampaignDto: UpdateCampaignDto) {
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

  async remove(id: number) {
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
