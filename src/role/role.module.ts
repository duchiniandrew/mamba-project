import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [RoleService],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule { }
