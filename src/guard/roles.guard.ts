import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../enum/role.enum';
import { UserService } from '../user/user.service';
import { UserRoleEntity } from '../userRole/entity/userRole.entity';

export type Jwt = {
    user: {
        email: string
        exp: number
        iat: number
        sub: number
        roles?: Role[]
    }
}

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles: Role[] = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) return true;
        const { user } = context.switchToHttp().getRequest() as Jwt;
        const where: Prisma.UsersWhereUniqueInput = { email: user.email }
        const include: Prisma.UsersInclude<DefaultArgs> = { UserRoles: { include: { Role: true } } }
        const { UserRoles } = await this.userService.findOne(where, include)
        return requiredRoles.some((role: Role) => UserRoles.find((userRole: UserRoleEntity) =>
            userRole.Role.name === role || userRole.Role.name === Role.SUPERADMIN
        ));
    }
}