import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserProcedure } from '../user/user.procedure';

@Injectable()
export class TrpcRouter {
    constructor(private readonly trpc: TrpcService, private userProcedure: UserProcedure) { }

    appRouter = this.trpc.router({
        createUser: this.userProcedure.create(),
        listUsers: this.userProcedure.findAll(),
        deleteUser: this.userProcedure.delete(),
        updateUser: this.userProcedure.update(),
        findOneUser: this.userProcedure.findOne(),
    });

    async applyMiddleware(app: INestApplication) {
        app.use(
            `/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
            }),
        );
    }
}

export type AppRouter = TrpcRouter[`appRouter`];

