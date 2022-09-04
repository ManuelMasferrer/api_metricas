import { CulturaRegionService } from './cultura-region.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RegionEntity } from '../region/region.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CulturaGastronomicaEntity, RegionEntity])],
    controllers: [],
    providers: [
        CulturaRegionService,],
})
export class CulturaRegionModule { }
