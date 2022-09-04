import { Module } from '@nestjs/common';
<<<<<<< HEAD
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
=======
import { CategoriaproductoService } from './categoriaproducto.service';
>>>>>>> 375460a (actuliza entidad)

@Module({
    imports: [],
    controllers: [],
    providers: [CategoriaproductoService],
  })
export class CategoriaproductoModule {}
>>>>>>> ee351af (Entities ciudad, categoria)
