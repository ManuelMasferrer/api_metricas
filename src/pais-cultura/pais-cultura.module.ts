import { Module } from '@nestjs/common';
import { PaisCulturaService } from './pais-cultura.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaisEntity } from '../pais/pais.entity';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaisEntity, CulturaGastronomicaEntity])],
  providers: [PaisCulturaService]
})
export class PaisCulturaModule {}
