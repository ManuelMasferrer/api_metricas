import { IsNotEmpty, IsString } from "class-validator";
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { CategoriaproductoEntity } from '../categoriaproducto/categoriaproducto.entity';
export class ProductoDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly description: string;

    readonly id: string;

    readonly culturagastronomica: CulturaGastronomicaEntity;

    readonly categoriaProducto: CategoriaproductoEntity;


}
