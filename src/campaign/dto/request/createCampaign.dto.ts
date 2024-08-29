import { ApiProperty } from '@nestjs/swagger';
import { Category, Status } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  Validate,
} from 'class-validator';
import { IsStartDateHigherThanEndDate } from '../../validation/IsStartDateHigherThanEndDate';
import { IsStartDateLessThanToday } from '../../validation/IsStartDateLessThanToday';

export class CreateCampaignDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Campaign name',
    example: 'Drink water!',
  })
  name: string;

  @IsDate()
  @Type(() => Date)
  @Validate(IsStartDateHigherThanEndDate)
  @Validate(IsStartDateLessThanToday)
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Campaign start date',
    example: '2024-01-01',
  })
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    type: String,
    description:
      'Campaign end date. This props need to be greater than start date',
    example: '2024-06-01',
  })
  endDate: Date;

  @IsEnum(Status)
  @ApiProperty({
    enum: Status,
    description: 'Campaign status',
    example: Status.ACTIVED,
  })
  status: Status;

  @IsEnum(Category)
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: 'Campaign Category',
    example: Category.ENVIRONMENTAL,
  })
  category: Category;

  constructor(data: Partial<CreateCampaignDto>) {
    Object.assign(this, data);
  }
}
