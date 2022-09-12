import { IsNotEmpty, IsString } from "class-validator";

export class RecetaDto {
    
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsString()
    @IsNotEmpty()
    readonly foto: string;

    @IsString()
    @IsNotEmpty()
    readonly preparacion: string;

    @IsString()
    @IsNotEmpty()
    readonly video: string;

}