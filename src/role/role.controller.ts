import {
    Controller,
    Post,
    Body,
    UseGuards,
  } from '@nestjs/common';
  import { RoleService } from './role.service';
import { RoleEntity } from './role.entity';
import { CreateRoleDto } from './dto/request/createRole.dto';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { RolesGuard } from '../guard/roles.guard';
  
  @Controller('role')
  export class RoleController {
    constructor(private readonly roleService: RoleService) { }
  
    @Post()
    @Roles(Role.SUPERADMIN)
    @UseGuards(RolesGuard)
    create(@Body() createRoleDto: CreateRoleDto): Promise<RoleEntity> {
      return this.roleService.create(createRoleDto);
    }
}