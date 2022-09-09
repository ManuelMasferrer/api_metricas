import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { CulturaRestauranteService } from './cultura-restaurante.service';

@Module({
  imports: [TypeOrmModule.forFeature([CulturaGastronomicaEntity, RestauranteEntity])],
  controllers: [],
  providers: [
    CulturaRestauranteService,],
})

export class CulturaRestauranteModule {}
