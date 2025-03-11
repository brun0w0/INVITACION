import { ApiProperty } from "@nestjs/swagger";

export class CreateInvitadoDto {
    @ApiProperty({ example: "Juan", description: "Nombre del invitado" })
    nombre: string;

    @ApiProperty({ example: "1234567890", description: "Telefono del invitado" })
    telefono: string;
}