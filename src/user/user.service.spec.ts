import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/request/updateUser.dto';
import userFactory from '../../test/factories/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Category, Status } from '@prisma/client';
import { PaginationDto } from '../common/pagination.dto';
import { RequestError } from '../types';
import { CreateUserDto } from './dto/request/createUser.dto';

describe('SectorController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, PrismaService],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [
        userFactory.build({
          id: 1,
          name: 'John Henry',
        }),
        userFactory.build({
          id: 2,
          name: 'Derek Frost',
        }),
        userFactory.build({
          id: 3,
          name: 'Political campaign',
        }),
      ];
      const campaigns = [
        userFactory.build({
          id: 1,
          name: 'Economic campaign',
          category: 'ECONOMIC',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
        userFactory.build({
          id: 2,
          name: 'Environmental campaign',
          category: 'ENVIRONMENTAL',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
        userFactory.build({
          id: 3,
          name: 'Political campaign',
          category: 'POLITICAL',
          startDate: new Date('2024-02-01'),
          endDate: new Date('2024-03-31'),
          status: Status.ACTIVED,
          updatedAt: new Date('2024-12-31'),
          createdAt: new Date('2024-01-01'),
        }),
      ];
      jest.spyOn(userService, 'findAll').mockResolvedValueOnce(campaigns);
      const paginationDto: PaginationDto = {
        skip: 10,
        take: 10,
      }
      expect(await controller.findAll(paginationDto)).toStrictEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a campaign with id 1', async () => {
      const campaign = userFactory.build({
        id: 1,
        name: 'Economic campaign',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      const expected = {
        id: 1,
        name: 'Economic campaign',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      };
      jest.spyOn(userService, 'findOne').mockResolvedValueOnce(campaign);
      expect(await controller.findOne(1)).toStrictEqual(expected);
    });

    it('should try to retrieve a campaign that does not exist', async () => {
      const forcedError = new RequestError('Campaign not found', 404);
      const expectedError = new RequestError('Campaign not found', 404);
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(forcedError);
      expect(async () => await controller.findOne(3)).rejects.toThrow(
        expectedError,
      );
    });
  });

  describe('create', () => {
    it('should return the new user', async () => {
      const campaign = userFactory.build({
        id: 3,
        name: 'Finance',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      const createUserDto: CreateUserDto = {
        name: "email",
        email: "email@email.com",
        password: "password"
      };
      const expectedResult = {
        id: 3,
        name: 'Finance',
        category: 'ECONOMIC',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      };
      jest.spyOn(userService, 'create').mockResolvedValueOnce(campaign);
      expect(await controller.create(createUserDto)).toStrictEqual(
        expectedResult,
      );
    });
  });

  describe('update', () => {
    it('should return the updated campaign', async () => {
      const campaign = userFactory.build({
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      const updateCampaignDto: UpdateUserDto = {
        email: "email@email.com",
        password: "password"
      };
      const expectedResult = {
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      };
      jest.spyOn(userService, 'update').mockResolvedValueOnce(campaign);
      expect(await controller.update(3, updateCampaignDto)).toStrictEqual(
        expectedResult,
      );
    });

    it('should try to update a campaign that does not exist', async () => {
      const updateCampaignDto: UpdateUserDto = {
        email: "email@email.com",
        password: "password"
      };
      const forcedError = new RequestError('Campaign not found', 404);
      const expectedError = new RequestError('Campaign not found', 404);
      jest.spyOn(userService, 'update').mockRejectedValueOnce(forcedError);
      expect(
        async () => await controller.update(30, updateCampaignDto),
      ).rejects.toThrow(expectedError);
    });
  });

  describe('delete', () => {
    it('should delete a campaign', async () => {
      const campaign = userFactory.build({
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });

      const expectedResult = userFactory.build({
        id: 3,
        name: 'Politics campaign',
        category: Category.POLITICAL,
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-03-31'),
        status: Status.ACTIVED,
        updatedAt: new Date('2024-12-31'),
        createdAt: new Date('2024-01-01'),
      });
      jest.spyOn(userService, 'remove').mockResolvedValueOnce(campaign);
      expect(await controller.remove(3)).toStrictEqual(expectedResult);
    });

    it('should try to delete a campaign that does not exist', async () => {
      const forcedError = new RequestError('Campaign not found', 404);
      const expectedError = new RequestError('Campaign not found', 404);
      jest.spyOn(userService, 'remove').mockRejectedValueOnce(forcedError);
      expect(async () => await controller.remove(3)).rejects.toThrow(
        expectedError,
      );
    });
  });
});
