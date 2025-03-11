import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AcompananteService } from "./acompanante.service";
import { CreateAcompananteDto } from "./dto/create-acompanante.dto";
import { UpdateAcompananteDto } from "./dto/update-acompanante.dto";

@ApiTags("acompanante")
@Controller("acompanante")
export class AcompananteController {
    constructor(
        private readonly acompananteService: AcompananteService,
    ) { }

    @Post('registrar')
    @ApiOperation({ summary: 'Registrar un acompañante' })
    @ApiResponse({ status: 201, description: 'El acompañante ha sido registrado' })
    @ApiResponse({ status: 400, description: 'Error al registrar el acompañante' })
    async create(@Body() createAcompananteDto: CreateAcompananteDto) {
        console.log('Datos recibidos en el backend:', createAcompananteDto);
        return this.acompananteService.create(createAcompananteDto);
    }

    @Get(':invitadoId/nombres')
    @ApiOperation({ summary: 'Obtener todos los nombres de acompañantes' })
    @ApiParam({ name: 'invitadoId', description: 'ID del invitado' })
    async findNombresByInvitado(@Param('invitadoId') invitadoId: number) {
        try {
            return await this.acompananteService.findNombresByInvitado(+invitadoId);
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateAcompananteDto: UpdateAcompananteDto,
    ) {
        const asistente = await this.acompananteService.update(+id, updateAcompananteDto);
        if (!asistente) {
            throw new NotFoundException('Acompañante no encontrado.');
        }
        return asistente;
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un acompañante' })
    @ApiParam({ name: 'id', description: 'ID del acompañante' })
    @ApiResponse({ status: 200, description: 'Acompañante eliminado correctamente' })
    @ApiResponse({ status: 404, description: 'Acompañante no encontrado' })
    async remove(@Param('id') id: number) {
        const acompanante = await this.acompananteService.remove(+id);
        if (!acompanante) {
            throw new NotFoundException('Acompañante no encontrado.');
        }
        return {message: 'Acompañante eliminado.'}
    }
}
