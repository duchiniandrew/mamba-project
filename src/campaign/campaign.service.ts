import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../src/prisma.service";
import { CreateCampaignDto } from "./dto/createCampaign.dto";
import { UpdateCampaignDto } from "./dto/updateCampaign.dto";

@Injectable()
export class CampaignService {
    constructor(private prisma: PrismaService) { }

    create(createCampaignDto: CreateCampaignDto) {
        return this.prisma.campaign.create({ data: createCampaignDto });
    }

    findAll() {
        return this.prisma.campaign.findMany();
    }

    findOne(id: number) {
        return this.prisma.campaign.findUnique({ where: { id } });
    }

    update(id: number, updateCampaignDto: UpdateCampaignDto) {
        return this.prisma.campaign.update({ data: updateCampaignDto, where: { id } });
    }

    remove(id: number) {
        //soft delete
        return this.prisma.campaign.update({
            data: {
                status: false
            },
            where: { id }
        });
    }
}