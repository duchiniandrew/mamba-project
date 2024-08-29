import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { Prisma } from '@prisma/client';
import { UserEntity } from 'src/user/dto/response/user.entity';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<{ access_token: string }> {
        const where: Prisma.UsersWhereUniqueInput = { email: email }
        const user: UserEntity = await this.userService.findOne(where);
        const decryptPasswordMatch: boolean = await bcrypt.compare(pass, user.password);
        if (!decryptPasswordMatch) throw new UnauthorizedException();
        const payload = { sub: user.id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}