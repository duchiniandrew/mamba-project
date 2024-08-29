import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { RoleEntity } from "src/role/role.entity";

export class UserRoleEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  userId: number

  @ApiProperty()
  Role: RoleEntity;

  @ApiProperty()
  User: UserRoleEntity

  @Exclude({ toPlainOnly: true })
  createdAt: Date;

  @Exclude({ toPlainOnly: true })
  updatedAt: Date;

  constructor(data: Partial<UserRoleEntity>) {
    Object.assign(this, data);
  }
}