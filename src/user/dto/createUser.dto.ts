import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User name',
    example: 'Jack johnson',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'jack@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'User password, will be hashed',
    example: 'jackonfive1956',
  })
  password: string;

  constructor(data: Partial<CreateUserDto>) {
    Object.assign(this, data);
  }
}
