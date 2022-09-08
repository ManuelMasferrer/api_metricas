import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaproductoEntity } from './categoriaproducto.entity';
import { CategoriaproductoService } from './categoriaproducto.service';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriaproductoEntity])],
    controllers: [],
    providers: [CategoriaproductoService,],
  })
export class CategoriaproductoModule {}