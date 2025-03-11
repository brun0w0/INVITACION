import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { InvitadoService } from "./invitado.service";
import { CreateInvitadoDto } from "./dto/create-invitado.dto";
import { UpdateInvitadoDto } from "./dto/update-invitado.dto";

@ApiTags("invitado")
@Controller("invitado")
export class InvitadoController {
    constructor(
        private readonly invitadoService: InvitadoService,
    ) { }

    @Post('registar')
    @ApiOperation({ summary: 'Registrar un invitado' })
    @ApiResponse({ status: 201, description: 'El invitado ha sido registrado' })
    @ApiResponse({ status: 400, description: 'El numero o nombre ya existe' })
    async create(@Body() createInvitadoDto: CreateInvitadoDto) {
        try {
            return await this.invitadoService.create(createInvitadoDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw error;
        }
    }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los invitados' })
    @ApiResponse({ status: 200, description: 'OK' })
    async findAll() {
        return await this.invitadoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number) {
        const invitado = await this.invitadoService.findOne(+id);
        if (!invitado) {
            throw new NotFoundException('Invitado no encontrado.');
        }
        return invitado;
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un invitado con sus acompañantes' })
    @ApiResponse({ status: 200, description: 'Datos eliminados correctamente' })
    @ApiResponse({ status: 400, description: 'El invitado no existe' })
    async remove(@Param('id') id: number) {
        const invitado = await this.invitadoService.remove(+id);
        if (!invitado) {
            throw new NotFoundException('Invitado no encontrado.');
        }
        return { message: 'Se eliminó correctamnete.' };
    }


    @Put(':id')
    @ApiOperation({ summary: 'Editar un invitado' })
    @ApiResponse({ status: 200, description: 'Invitado editado correctamente' })
    async update(
        @Param('id') id: number ,
        @Body() updateInvitadoDto: UpdateInvitadoDto,
    ) {
        const asistente = await this.invitadoService.update(
            +id,
            updateInvitadoDto,
        );
        if (!asistente) {
            throw new NotFoundException ('Invitado no encontrado');
        }
        return asistente;
    }
}