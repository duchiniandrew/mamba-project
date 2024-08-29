import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/request/createUser.dto';
import { UpdateUserDto } from './dto/request/updateUser.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from '../types';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './dto/response/user.entity';
import { Prisma, Users } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private configService: ConfigService, private roleService: RoleService) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = await bcrypt.hashSync(createUserDto.password, this.configService.get<string>("HASH"));
    const user = await this.prisma.users.create({ data: createUserDto });
    return this.generateResponseDto(user);
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.users.findMany();
    return users.map(u => this.generateResponseDto(u));
  }

  async findOne(where: Prisma.UsersWhereUniqueInput, include?: Prisma.UsersInclude<DefaultArgs>): Promise<UserEntity> {
    const user = await this.prisma.users.findUnique({
      where,
      include,
    });
    return this.generateResponseDto(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity | RequestError> {
    try {
      const user = await this.prisma.users.update({
        data: updateUserDto,
        where: { id },
      });
      return this.generateResponseDto(user);
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('User not found', 404);
      }
    }
  }

  async remove(id: number): Promise<UserEntity | RequestError> {
    try {
      const user = await this.prisma.users.delete({
        where: { id },
      });
      return this.generateResponseDto(user);
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('User not found', 404);
      }
    }
  }

  async addUserRole(where: Prisma.UsersWhereUniqueInput, roleName: string): Promise<void> {
    const roleWhere: Prisma.RolesWhereInput = { name: roleName }
    const roleInclude: Prisma.RolesInclude<DefaultArgs> = { UserRole: true }
    const role = await this.roleService.find(roleWhere, roleInclude);
    if (!role) throw new RequestError('Role not found', 404);
    if (role.UserRole.find(userRole => userRole.id === role.id && userRole.userId === where.id)) return
    await this.prisma.users.update({
      where,
      data: {
        UserRoles: {
          create: {
            roleId: role.id
          }
        }
      }
    })
  }

  private generateResponseDto(user: Users): UserEntity {
    return new UserEntity(user)
  }
}
