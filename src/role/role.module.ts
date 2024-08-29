import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [PrismaModule, forwardRef(() => UserModule)],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule { }
