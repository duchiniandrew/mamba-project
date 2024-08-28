import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { BadRequestCommonError, RequestError } from '../types';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserEntity } from './entity/user.entity';
import { Public } from 'src/decorators/isPublic.decorator';
import { Prisma } from '@prisma/client';
import { CreateRoleDto } from './dto/createUserRole.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Public()
  @ApiProperty({
    type: CreateUserDto,
    description: 'This is a required property',
  })
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Return the user created.',
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestCommonError,
    description: "Bad request body wasn't valid.",
    example: {
      statusCode: 400,
      message: ['name should not be empty', 'name must be a string'],
      error: 'Bad Request',
    },
  })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Return all Users.',
    isArray: true,
  })
  @ApiResponse({ status: 200, description: 'List of all Users.' })
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    schema: { oneOf: [{ type: 'number' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Get one user' })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No Users found.',
    type: RequestError,
    example: {
      statusCode: 404,
      message: 'User not found.',
      error: 'Not Found',
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Get a single a user.',
    type: UserEntity,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | RequestError> {
    const user = await this.userService.findOne({ id });
    if (!user) return new RequestError('User not found.', 404);
    return user;
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    schema: { oneOf: [{ type: 'number' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Return the updated user.',
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No Users found.',
    type: RequestError,
    example: {
      statusCode: 404,
      message: 'User not found.',
      error: 'Not Found',
    },
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestCommonError,
    description: "Bad request body wasn't valid.",
    example: {
      statusCode: 400,
      message: ['name must be a string'],
      error: 'Bad Request',
    },
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateUserDto: UpdateUserDto,
  ): Promise<UserEntity | RequestError> {
    return this.userService.update(id, UpdateUserDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'User ID',
    schema: { oneOf: [{ type: 'number' }, { type: 'integer' }] },
  })
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    type: UserEntity,
    description: 'Return the deleted user.',
  })
  @ApiBadRequestResponse({
    status: 400,
    type: BadRequestCommonError,
    description: "Bad request body wasn't valid.",
    example: {
      statusCode: 400,
      message: ['name must be a string'],
      error: 'Bad Request',
    },
  })
  @ApiNotFoundResponse({
    status: 404,
    description: 'No Users found.',
    type: RequestError,
    example: {
      statusCode: 404,
      message: 'User not found.',
      error: 'Not Found',
    },
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<UserEntity | RequestError> {
    const user = await this.userService.remove(id);
    if (!user) return new RequestError('User not found.', 404);
    return user;
  }

  @Post('/add-role')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  addUserRole(@Body() createRoleDto: CreateRoleDto): Promise<void> {
    const where: Prisma.UsersWhereUniqueInput = { id: createRoleDto.id };
    return this.userService.addUserRole(where, createRoleDto.roleName);
  }
}
