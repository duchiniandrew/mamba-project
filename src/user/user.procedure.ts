import { UserService } from "./user.service";
import { TrpcService } from "../trpc/trpc.service";
import { z } from 'zod';
import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/request/createUser.dto";

@Injectable()
export class UserProcedure {
    constructor(private readonly trpc: TrpcService, private userService: UserService) { }

    create() {
        return this.trpc.procedure
            .input(
                z.object({
                    name: z.string(),
                    email: z.string(),
                    password: z.string(),
                }),
            )
            .query(({ input }) => {
                if (!input.name || !input.email || !input.password) {
                    throw new Error('Invalid input');
                }
                const createUserDto: CreateUserDto = {
                    name: input.name,
                    email: input.email,
                    password: input.password,
                }
                return this.userService.create(createUserDto);
            });
    }

    findAll() {
        return this.trpc.procedure
            .query(() => {
                return this.userService.findAll();
            });
    }

    findOne() {
        return this.trpc.procedure
            .input(
                z.object({
                    id: z.number(),
                }),
            )
            .query(({ input }) => {
                const { id } = input;
                return this.userService.findOne({ id });
            });
    }

    update() {
        return this.trpc.procedure
            .input(
                z.object({
                    id: z.number(),
                    name: z.string(),
                }),
            )
            .query(({ input }) => {
                const { id } = input;
                return this.userService.update(id, input);
            });
    }

    delete() {
        return this.trpc.procedure
            .input(
                z.object({
                    id: z.number(),
                }),
            )
            .query(({ input }) => {
                const { id } = input;
                return this.userService.remove(id);
            });
    }
}