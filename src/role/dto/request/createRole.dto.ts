import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  constructor(data: Partial<CreateRoleDto>) {
    Object.assign(this, data);
  }
}
