import { ApiProperty } from "@nestjs/swagger";

export class UpdateInvitadoDto {
    @ApiProperty({example: 'Juan', description: 'nombre'})
    nombre?: string;

    @ApiProperty({example: '1234567890', description: 'numero'})
    telefono?: string;
}