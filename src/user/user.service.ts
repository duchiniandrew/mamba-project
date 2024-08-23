import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { rowDoesNotExistCode } from '../prismaErrors';
import { RequestError } from '../types';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private configService: ConfigService) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    createUserDto.password = await bcrypt.hashSync(createUserDto.password, this.configService.get<string>("HASH"));
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  findOne(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity | RequestError> {
    try {
      const user = await this.prisma.user.update({
        data: updateUserDto,
        where: { id },
      });
      return user;
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('User not found', 404);
      }
    }
  }

  async remove(id: number): Promise<UserEntity | RequestError> {
    try {
      const user = await this.prisma.user.delete({
        where: { id },
      });
      return user;
    } catch (error) {
      if (error.code === rowDoesNotExistCode) {
        return new RequestError('User not found', 404);
      }
    }
  }
}
