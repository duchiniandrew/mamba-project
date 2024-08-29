import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  addExtension() {
    this.$extends({
      query: {
        campaigns: {
          async findMany({ model, operation, args, query }) {
            console.log(model)
            console.log(operation)
            const aux = await query(args)
            return query(args)
          }
        }
      }
    })
  }
}
