
import {IsNotEmpty, IsString} from 'class-validator';

export class CategoraproductoDto {
    
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsNotEmpty()
    @IsString()
    readonly id: string;

}
