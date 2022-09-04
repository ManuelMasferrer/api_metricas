import { TypeOrmModule } from "@nestjs/typeorm";
import { PaisEntity } from "../../pais/pais.entity";
import { RecetaEntity } from "../../receta/receta.entity";
import { CulturaGastronomicaEntity } from "../../culturagastronomica/culturagastronomica.entity";
import { RegionEntity } from "../../region/region.entity";

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        entities: [CulturaGastronomicaEntity, RegionEntity, PaisEntity, RecetaEntity],
        synchronize: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([CulturaGastronomicaEntity, RegionEntity, RecetaEntity, PaisEntity]),
];
