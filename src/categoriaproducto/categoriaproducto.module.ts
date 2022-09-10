import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaproductoEntity } from './categoriaproducto.entity';
import { CategoriaproductoService } from './categoriaproducto.service';

@Module({
    imports: [TypeOrmModule.forFeature([CategoriaproductoEntity])],
    controllers: [],
    providers: [CategoriaproductoService,],
  })
export class CategoriaproductoModule {}
=======

@Module({
    imports: [],
    controllers: [],
    providers: [],
  })
export class CategoriaproductoModule {}
>>>>>>> ee351af (Entities ciudad, categoria)
