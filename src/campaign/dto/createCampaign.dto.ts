import { Category } from "@prisma/client";
import { IsBoolean, IsDate, IsEnum, IsString } from "class-validator";

export class CreateCampaignDto {

    @IsString()
    name: string

    @IsDate()
    startDate: Date

    @IsDate()
    endDate: Date

    @IsBoolean()
    status: boolean

    @IsEnum(Category)
    category: Category

    constructor(data: Partial<CreateCampaignDto>) {
        Object.assign(this, data)
    }
}