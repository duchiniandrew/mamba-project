import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserRoleEntity } from 'src/userRole/entity/userRole.entity';

export class RoleEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  UserRole?: UserRoleEntity[];

  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  constructor(data: Partial<RoleEntity>) {
    Object.assign(this, data);
  }
}
