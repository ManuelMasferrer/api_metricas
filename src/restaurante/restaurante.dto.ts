import { IsNotEmpty, IsString } from "class-validator";
import { CulturaGastronomicaEntity } from "../culturagastronomica/culturagastronomica.entity";
import { CiudadEntity } from "../ciudad/ciudad.entity";
export class RestauranteDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
 
    @IsNotEmpty()
    readonly michelin: number;
 
    @IsString()
    @IsNotEmpty()
    readonly  fechaMichelin: string;

    readonly id: string;

    readonly culturagastronomica: CulturaGastronomicaEntity;

    readonly ciudad: CiudadEntity;
 

}
