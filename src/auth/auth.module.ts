import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './auth.constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    AuthService, {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }