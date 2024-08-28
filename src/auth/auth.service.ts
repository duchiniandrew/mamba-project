import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService, private configService: ConfigService) { }

    async signIn(
        email: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.userService.findOne({ email });
        const decryptPasswordMatch = await bcrypt.compare(pass, user.password);
        if (!decryptPasswordMatch) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email, roles: user.UserRoles.map(role => role.Role.name) };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}