import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
    providers: [
        PrismaService,
        {
            provide: "PrismaService",
            useFactory () { 
                return new PrismaService().addExtension()
            }
        }
    ],
    exports: [PrismaService, "PrismaService"],
    
})
export class PrismaModule { }