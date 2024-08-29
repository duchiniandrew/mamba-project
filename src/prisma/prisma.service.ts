import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  addExtension() {
    return this.$extends({
      query: {
        campaigns: {
          findMany: async ({ model, operation, args, query }) => {
            // TODO: We can capture the query here before it really runs in the DB, so we can modify like a middleware here
            // The idea here is to add some kind of access logic, like if user paid for basic plan he can have access only to data from 2024 year
            // If he paid for premium plan he can have access to all data
            // to do that you can just:
            // args.where = {
            //   createdAt: {
            //     gte: new Date('2024-01-01'),
            //     lte: new Date('2024-12-31')
            //   }
            // }
            // The problem here is that we don't have the context of who ran this query, so we can't know if the user is premium or basic
            // Need to find a good way to pass the user context here
            return query(args)
          }
        }
      }
    })
  }
}
