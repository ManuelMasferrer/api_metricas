
import { IsNotEmpty, IsString, IsUrl } from "class-validator";
export class CiudadDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly id: string;

}