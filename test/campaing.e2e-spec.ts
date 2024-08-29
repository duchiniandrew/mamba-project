import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'superagent';
import { describe } from 'node:test';
import { PrismaService } from '../src/prisma/prisma.service';
import { Status } from '@prisma/client';
import { CreateCampaignDto } from '../src/campaign/dto/request/createCampaign.dto';
import { UpdateCampaignDto } from '../src/campaign/dto/request/updateCampaign.dto';
import { AppModule } from '../src/app.module';

describe('campaign.controller.ts', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/campaign/:id (GET)', async () => {
    it('should return a specific campaign', async () => {
      await prismaService.campaigns
        .create({
          data: {
            id: 1000,
            name: 'Economic campaign',
            category: 'ECONOMIC',
            startDate: new Date('2024-02-01'),
            endDate: new Date('2024-03-31'),
            status: 'ACTIVED',
            updatedAt: new Date('2024-12-31'),
            createdAt: new Date('2024-01-01'),
          },
        })
        .catch(() => {
          /*Just to confirm that roow with ID 1000 with in database*/
        });
      const expectedCampaign = {
        id: 1000,
        name: 'Economic campaign',
        category: 'ECONOMIC',
        startDate: '2024-02-01T00:00:00.000Z',
        endDate: '2024-03-31T00:00:00.000Z',
        status: 'ACTIVED',
        updatedAt: '2024-12-31T00:00:00.000Z',
        createdAt: '2024-01-01T00:00:00.000Z',
      };
      const token = await request.post('http://localhost:3000/auth/login').send({ email: "duchiniandrew@gmail.com", password: "123456" });
      console.log(token.body.access_token);
      const result = await request.get('http://localhost:3000/campaign/1000').set('Authorization', `Bearer ${token.body.access_token}`);
      await prismaService.campaigns.delete({
        where: { id: 1000 },
      });

      expect(result.body).toStrictEqual(expectedCampaign);
    });

    it('should return a 404 error', async () => {
      const expectedResult = {
        error: 'Campaign not found.',
        statusCode: 404,
      };
      const token = await request.post('http://localhost:3000/auth/login').send({ email: "duchiniandrew@gmail.com", password: "123456" });
      console.log(token.body.access_token);
      const result = await request.get('http://localhost:3000/campaign/100000').set('Authorization', `Bearer ${token.body.access_token}`);
      expect(result.body).toStrictEqual(expectedResult);
    });
  });

  // describe('/campaign (POST)', async () => {
  //   const token = await request.post('http://localhost:3000/auth/login').send({ email: "duchiniandrew@gmail.com", password: "123456" });

  //   it('should create a campaign', async () => {
  //     const createCampaignDto: CreateCampaignDto = {
  //       category: 'ECONOMIC',
  //       name: 'Finance',
  //       startDate: new Date('2024-02-01'),
  //       endDate: new Date('2024-03-31'),
  //       status: 'ACTIVED',
  //     };
  //     const expectedResult = {
  //       id: 1,
  //       name: 'Finance',
  //       category: 'ECONOMIC',
  //       startDate: '2024-02-01T00:00:00.000Z',
  //       endDate: '2024-03-31T00:00:00.000Z',
  //       status: 'ACTIVED',
  //       updatedAt: '2024-12-31T00:00:00.000Z',
  //       createdAt: '2024-01-01T00:00:00.000Z',
  //     };
  //     const result = await request
  //       .post('http://localhost:3000/campaign').set('Authorization', `Bearer ${token.body.access_token}`)
  //       .send(createCampaignDto);

  //     await prismaService.campaigns.delete({
  //       where: { id: result.body.id },
  //     });
  //     expect(result.body.name).toBe(expectedResult.name);
  //     expect(result.body.category).toBe(expectedResult.category);
  //     expect(result.body.status).toBe(expectedResult.status);
  //     expect(result.body.startDate).toBe(expectedResult.startDate);
  //   });
  //   it('should return a 400 error because of missing fields', async () => {
  //     const createCampaignDto = {
  //       category: 'ECONOMIC',
  //       startDate: '2024-02-01T00:00:00.000Z',
  //       endDate: '2024-03-31T00:00:00.000Z',
  //       status: 'ACTIVED',
  //     };
  //     const expectedResult = {
  //       error: 'Bad Request',
  //       message: ['name should not be empty', 'name must be a string'],
  //       statusCode: 400,
  //     };
  //     try {
  //       await request
  //         .post('http://localhost:3000/campaign').set('Authorization', `Bearer ${token.body.access_token}`)
  //         .send(createCampaignDto);
  //     } catch (error) {
  //       expect(error.response.body).toStrictEqual(expectedResult);
  //     }
  //   });
  // });

  // describe('/campaign (PATCH)', async () => {
  //   const token = await request.post('http://localhost:3000/auth/login').send({ email: "duchiniandrew@gmail.com", password: "123456" });

  //   it('should update a campaign', async () => {
  //     await prismaService.campaigns
  //       .create({
  //         data: {
  //           id: 2000,
  //           name: 'Economic campaign',
  //           category: 'ECONOMIC',
  //           startDate: new Date('2024-02-01'),
  //           endDate: new Date('2024-03-31'),
  //           status: 'ACTIVED',
  //           updatedAt: new Date('2024-12-31'),
  //           createdAt: new Date('2024-01-01'),
  //         },
  //       })
  //       .catch(() => {
  //         /*Just to confirm that roow with ID 1000 with in database*/
  //       });
  //     const updateCampaignDto: UpdateCampaignDto = {
  //       category: 'POLITICAL',
  //       name: 'Trump campaign',
  //       status: Status.EXPIRED,
  //     };
  //     const expectedResult = {
  //       id: 2000,
  //       name: 'Trump campaign',
  //       category: 'POLITICAL',
  //       startDate: '2024-02-01T00:00:00.000Z',
  //       endDate: '2024-03-31T00:00:00.000Z',
  //       status: Status.EXPIRED,
  //     };
  //     const result = await request
  //       .patch('http://localhost:3000/campaign/2000').set('Authorization', `Bearer ${token.body.access_token}`)
  //       .send(updateCampaignDto);
  //     await prismaService.campaigns.delete({
  //       where: { id: 2000 },
  //     });
  //     expect(result.body.name).toBe(expectedResult.name);
  //     expect(result.body.category).toBe(expectedResult.category);
  //     expect(result.body.status).toBe(expectedResult.status);
  //     expect(result.body.startDate).toBe(expectedResult.startDate);
  //     expect(result.body.endDate).toBe(expectedResult.endDate);
  //   });
  // });

  // describe('/campaign (DELETE)', async () => {
  //   const token = await request.post('http://localhost:3000/auth/login').send({ email: "duchiniandrew@gmail.com", password: "123456" });

  //   it('should delete a campaign', async () => {
  //     await prismaService.campaigns
  //       .create({
  //         data: {
  //           id: 3000,
  //           name: 'Economic campaign',
  //           category: 'ECONOMIC',
  //           startDate: new Date('2024-02-01'),
  //           endDate: new Date('2024-03-31'),
  //           status: 'ACTIVED',
  //           updatedAt: new Date('2024-12-31'),
  //           createdAt: new Date('2024-01-01'),
  //         },
  //       })
  //       .catch(() => {
  //         /*Just to confirm that roow with ID 1000 with in database*/
  //       });
  //     const expectedResult = {
  //       id: 3000,
  //       name: 'Economic campaign',
  //       category: 'ECONOMIC',
  //       startDate: '2024-02-01T00:00:00.000Z',
  //       endDate: '2024-03-31T00:00:00.000Z',
  //       status: 'ACTIVED',
  //       updatedAt: '2024-12-31T00:00:00.000Z',
  //       createdAt: '2024-01-01T00:00:00.000Z',
  //     };
  //     const result = await request.delete(
  //       'http://localhost:3000/campaign/3000',
  //     ).set('Authorization', `Bearer ${token.body.access_token}`);
  //     expect(result.body).toStrictEqual(expectedResult);
  //   });
  // });
});
