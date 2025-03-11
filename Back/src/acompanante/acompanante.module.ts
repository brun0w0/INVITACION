import { Module } from "@nestjs/common";
import { AcompananteController } from "./acompanante.controller";
import { AcompananteService } from "./acompanante.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [AcompananteController],
    providers: [AcompananteService, PrismaService],
})

export class AcompananteModule {}