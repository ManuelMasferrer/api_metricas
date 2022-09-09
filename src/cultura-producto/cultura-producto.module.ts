import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { ProductoEntity } from '../producto/producto.entity';
import { CulturaProductoService } from './cultura-producto.service';

@Module({
  imports: [TypeOrmModule.forFeature([CulturaGastronomicaEntity, ProductoEntity])],
  controllers: [],
  providers: [
    CulturaProductoService,],
})

export class CulturaRestauranteModule {}
export class CulturaProductoModule {}
