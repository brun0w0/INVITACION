import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateInvitadoDto } from "./dto/create-invitado.dto";
import { UpdateInvitadoDto } from "./dto/update-invitado.dto";

@Injectable()
export class InvitadoService {
    constructor(private prisma: PrismaService) { }

    async create(createInvitadoDto: CreateInvitadoDto) {
        const { nombre, telefono, asistentes } = createInvitadoDto;

        const invitadoExistente = await this.prisma.invitado.findFirst({
            where: { telefono },
        });

        if (invitadoExistente) {
            throw new BadRequestException("El numero ya existe");
        }

        return this.prisma.invitado.create({
            data: { nombre, telefono, asistentes },
        });
    }

    async findAll() {
        const invitados = await this.prisma.invitado.findMany({
            include: { acompanantes: true },
        });
        return invitados.map((invitado) => ({
            id: invitado.id,
            nombre: invitado.nombre,
            telefono: invitado.telefono,
            asistentes: invitado.asistentes,
        }));
    }

    async findByNumero(telefono: string) {
        const asistente = await this.prisma.invitado.findFirst({
            where: { telefono },
            select: { id: true },
        });

        if (!asistente) {
            throw new BadRequestException('No se encontro el invitado.');
        }

        return asistente.id;
    }



    async findOne(id: number) {
        return this.prisma.invitado.findUnique({
            where: { id },
            include: {
                acompanantes: true,
            },
        });
    }

    async remove(id: number) {
        await this.prisma.acompanante.deleteMany({
            where: { invitadoId: id },
        });

        return this.prisma.invitado.delete({
            where: { id },
        });
    }

    async update(id: number, updateInvitadoDto: UpdateInvitadoDto) {
        return this.prisma.invitado.update({
            where: { id },
            data: updateInvitadoDto,
        });
    }
}