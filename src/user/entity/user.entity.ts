import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(data: Partial<UserEntity>) {
    Object.assign(this, data);
  }
}
