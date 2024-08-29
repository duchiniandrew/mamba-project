import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

export const PRISMA_INJECTION_TOKEN = "PrismaService";

@Module({
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule { }