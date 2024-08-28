import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/request/createRole.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from '../types';
import { RoleEntity } from './role.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
        return this.prisma.roles.create({ data: createRoleDto });
    }

    findAll(): Promise<RoleEntity[]> {
        return this.prisma.roles.findMany();
    }

    findOne(where: Prisma.RolesWhereUniqueInput): Promise<RoleEntity> {
        return this.prisma.roles.findUnique({ where });
    }

    find(where: Prisma.RolesWhereInput, include?: Prisma.RolesInclude) {
        return this.prisma.roles.findFirst({ where, include });
    }

    async remove(where: Prisma.RolesWhereUniqueInput): Promise<RoleEntity | RequestError> {
        try {
            const role = await this.prisma.roles.delete({ where });
            return role;
        } catch (error) {
            if (error.code === rowDoesNotExistCode) {
                return new RequestError('Role not found', 404);
            }
        }
    }
}
