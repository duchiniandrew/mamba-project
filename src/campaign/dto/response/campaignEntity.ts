import { ApiProperty } from '@nestjs/swagger';
import { Category, Status } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class CampaignEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty()
  category: Category;

  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  constructor(data: Partial<CampaignEntity>) {
    Object.assign(this, data);
  }
}
