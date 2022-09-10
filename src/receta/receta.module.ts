import { Module } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetaEntity } from './receta.entity';
import { RecetaController } from './receta.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RecetaEntity])],
  controllers: [RecetaController],
  providers: [RecetaService,],
})
export class RecetaModule {
  // constructor(private readonly recetaService: RecetaService ){}
}
