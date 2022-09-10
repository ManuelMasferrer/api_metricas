import { IsNotEmpty, IsString } from "class-validator";
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';

export class RecetaDto {

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly descripcion: string;

    @IsNotEmpty()
    @IsString()
    readonly foto: string;

    @IsNotEmpty()
    @IsString()
    readonly preparacion: string;

    @IsNotEmpty()
    @IsString()
    readonly video: string;

    readonly id: string;

}