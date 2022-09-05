import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteService } from './restaurante.service';
@Module({
  imports: [TypeOrmModule.forFeature([RestauranteEntity])],
  controllers: [],
  providers: [RestauranteService],
})
export class RestauranteModule {}
