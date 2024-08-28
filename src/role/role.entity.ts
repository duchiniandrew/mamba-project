import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class RoleEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(data: Partial<RoleEntity>) {
    Object.assign(this, data);
  }
}
