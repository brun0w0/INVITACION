import { Module } from "@nestjs/common";
import { InvitadoController } from "./invitado.controller";
import { InvitadoService } from "./invitado.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [InvitadoController],
    providers: [InvitadoService, PrismaService],
})

export class InvitadoModule {}