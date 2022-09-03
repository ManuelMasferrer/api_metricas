import { CulturagastronomicaService } from './culturagastronomica.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from './culturagastronomica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CulturaGastronomicaEntity])],
  controllers: [],
  providers: [
    CulturagastronomicaService,],
})
export class CulturaGastronomicaModule {}
