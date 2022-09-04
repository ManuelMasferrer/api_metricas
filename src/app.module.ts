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

@Module({
  imports: [
    RegionModule,
    CulturaGastronomicaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'culturagastronomica',
      entities: [RegionEntity, CulturaGastronomicaEntity, RecetaEntity, PaisEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    RecetaModule,
    PaisModule,
    CulturaRecetaModule,
    CulturaPaisModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
