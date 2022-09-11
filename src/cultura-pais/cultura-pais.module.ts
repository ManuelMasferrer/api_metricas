import { Module } from '@nestjs/common';
import { CulturaPaisService } from './cultura-pais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { CulturaPaisController } from './cultura-pais.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CulturaGastronomicaEntity, PaisEntity])],
  providers: [CulturaPaisService],
  controllers: [CulturaPaisController]
})
export class CulturaPaisModule {}
