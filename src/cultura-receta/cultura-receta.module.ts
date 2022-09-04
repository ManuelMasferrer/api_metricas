import { Module } from '@nestjs/common';
import { CulturaRecetaService } from './cultura-receta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RecetaEntity } from '../receta/receta.entity';

@Module({
  providers: [CulturaRecetaService],
  imports:  [TypeOrmModule.forFeature([CulturaGastronomicaEntity, RecetaEntity])]
})
export class CulturaRecetaModule {}
