import {
    IsNotEmpty,
    IsString
} from 'class-validator';
export class CulturagastronomicaDto {
    readonly id: string;
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;
}
