import { CulturaRegionModule } from './cultura-region/cultura-region.module';
import { RegionModule } from './region/region.module';
import { CulturaGastronomicaModule } from './culturagastronomica/culturagastronomica.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionEntity } from './region/region.entity';
import { CulturaGastronomicaEntity } from './culturagastronomica/culturagastronomica.entity';
import { RecetaModule } from './receta/receta.module';
import { PaisModule } from './pais/pais.module';
import { RecetaEntity } from './receta/receta.entity';
import { PaisEntity } from './pais/pais.entity';
import { CulturaRecetaModule } from './cultura-receta/cultura-receta.module';
import { CulturaPaisModule } from './cultura-pais/cultura-pais.module';
import { PaisCulturaModule } from './pais-cultura/pais-cultura.module';
import { CiudadModule } from './ciudad/ciudad.module';
import { CategoriaproductoModule } from './categoriaproducto/categoriaproducto.module';
import { ProductoModule } from './producto/producto.module';
import { RestauranteModule } from './restaurante/restaurante.module';
import { CiudadEntity } from './ciudad/ciudad.entity';
import { RestauranteEntity } from './restaurante/restaurante.entity';
import { ProductoEntity } from './producto/producto.entity';

@Module({
  imports: [
    CulturaRegionModule,
    RegionModule,
    CulturaGastronomicaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'culturagastronomica',
      entities: [RegionEntity, CulturaGastronomicaEntity, RecetaEntity, RestauranteEntity, PaisEntity, CiudadEntity],

      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    RecetaModule,
    PaisModule,
    CulturaRecetaModule,
    CulturaPaisModule,
    PaisCulturaModule,
    CiudadModule,
    CategoriaproductoModule,
    ProductoModule,
    RestauranteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
