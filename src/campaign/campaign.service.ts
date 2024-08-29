import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCampaignDto } from './dto/request/createCampaign.dto';
import { UpdateCampaignDto } from './dto/request/updateCampaign.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from '../types';
import { Campaigns, Prisma, Status } from '@prisma/client';
import { CampaignEntity } from './dto/response/campaignEntity';
import { S3Service } from 'src/aws/aws.service';
import { ObjectCannedACL } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class CampaignService {
  constructor(private prisma: PrismaService, private s3Service: S3Service, private configService: ConfigService) { }

  async create(createCampaignDto: CreateCampaignDto, file: Express.Multer.File): Promise<CampaignEntity> {
    if (createCampaignDto.endDate.getTime() < new Date().getTime())
      createCampaignDto.status = Status.EXPIRED;
    if (file) {
      await this.s3Service.createObject(file.originalname, file.buffer, ObjectCannedACL.public_read_write);
    }
    const imageUrl = file ? this.configService.get<string>('BUCKET_FILE_ADDRESS') + file.originalname : null;
    const campaign = await this.prisma.campaigns.create({
      data: {
        ...createCampaignDto,
        imageUrl
      }
    });
    return this.generateResponseDto(campaign);
  }

  async findAll(paginationDto?: PaginationDto, orderBy?: Prisma.CampaignsOrderByWithRelationInput, select?: Prisma.CampaignsSelect<DefaultArgs>): Promise<CampaignEntity[]> {
    const { take, skip } = paginationDto
    const campaign = await this.prisma.campaigns.findMany({ select, take, skip, orderBy });
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
