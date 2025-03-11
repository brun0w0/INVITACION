import { ApiProperty } from "@nestjs/swagger";

export class UpdateAcompananteDto {
    @ApiProperty({example: 'Pepe', description: 'nombre'})
    nombre?: string;
}