import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAcompananteDto } from "./dto/create-acompanante.dto";
import { UpdateAcompananteDto } from "./dto/update-acompanante.dto";

@Injectable()
export class AcompananteService {
    constructor(private prisma: PrismaService) { }

    async create(createAcompananteDto: CreateAcompananteDto) {
        try {
            console.log("Intentando registrar:", createAcompananteDto);

            const invitado = await this.prisma.invitado.findUnique({
                where: { id: createAcompananteDto.invitadoId },
            });

            if (!invitado) {
                throw new NotFoundException("Invitado no encontrado");
            }

            const nuevoAcompanante = await this.prisma.acompanante.create({
                data: {
                    nombre: createAcompananteDto.nombre,
                    invitadoId: createAcompananteDto.invitadoId,
                },
            });

            console.log("Acompañante creado:", nuevoAcompanante);

            await this.prisma.invitado.update({
                where: { id: createAcompananteDto.invitadoId },
                data: { asistentes: invitado.asistentes + 1 },
            });

            return nuevoAcompanante;
        } catch (error) {
            console.error("Error en create():", error);
            throw new Error("Error al registrar el acompañante: " + error.message);
        }
    }

    async findNombresByInvitado(invitadoId: number) {
        console.log("Buscando acompañantes para invitado:", invitadoId);

        const invitado = await this.prisma.invitado.findUnique({
            where: { id: invitadoId }
        });

        if (!invitado) {
            throw new NotFoundException(`No se encontró un invitado con id ${invitadoId}`);
        }

        const acompanantes = await this.prisma.acompanante.findMany({
            where: { invitadoId },
            select: { nombre: true }
        });

        return acompanantes.map((a) => a.nombre);
    }

    async update(id: number, updateAcompananteDto: UpdateAcompananteDto) {
        return this.prisma.acompanante.update({
            where: {id},
            data: updateAcompananteDto,
        });
    }

    async remove(id: number){
        return this.prisma.acompanante.delete({
            where: {id},
        });
    }
}
