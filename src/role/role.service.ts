import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/request/createRole.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from '../types';
import { RoleEntity } from './role.entity';
import { Prisma, Roles } from '@prisma/client';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        const role = await this.prisma.roles.create({ data: createRoleDto });
        return this.generateResponseDto(role);
    }

    async findAll(): Promise<RoleEntity[]> {
        const roles = await this.prisma.roles.findMany();
        return roles.map(role => this.generateResponseDto(role));
    }

    async findOne(where: Prisma.RolesWhereUniqueInput): Promise<RoleEntity> {
        const role = await this.prisma.roles.findUnique({ where });
        return this.generateResponseDto(role);
    }

    async find(where: Prisma.RolesWhereInput, include?: Prisma.RolesInclude): Promise<RoleEntity> {
        const role = await this.prisma.roles.findFirst({ where, include });
        return this.generateResponseDto(role);
    }

    async remove(where: Prisma.RolesWhereUniqueInput): Promise<RoleEntity | RequestError> {
        try {
            const role = await this.prisma.roles.delete({ where });
            return this.generateResponseDto(role);
        } catch (error) {
            if (error.code === rowDoesNotExistCode) {
                return new RequestError('Role not found', 404);
            }
        }
    }

    private generateResponseDto(role: Roles): RoleEntity {
        return new RoleEntity(role);
    }
}
