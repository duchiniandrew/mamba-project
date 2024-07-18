import { Category } from "@prisma/client";

export class EntityCampaign {
    id: number
    name: string
    startDate: Date
    endDate: Date
    status: boolean
    category: Category
    createdAt: Date
    updatedAt: Date

    constructor(data: Partial<EntityCampaign>) {
        Object.assign(this, data)
    }
}