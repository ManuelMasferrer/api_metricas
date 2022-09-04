import { TypeOrmModule } from "@nestjs/typeorm";
import { PaisEntity } from "../../pais/pais.entity";
import { RecetaEntity } from "../../receta/receta.entity";
import { CulturaGastronomicaEntity } from "../../culturagastronomica/culturagastronomica.entity";
import { RegionEntity } from "../../region/region.entity";
import { ProductoEntity } from '../../producto/producto.entity';
import { CiudadEntity } from '../../ciudad/ciudad.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [CulturaGastronomicaEntity, RegionEntity, PaisEntity, RecetaEntity, ProductoEntity, CiudadEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([CulturaGastronomicaEntity, RegionEntity, RecetaEntity, PaisEntity, ProductoEntity, CiudadEntity]),
];
