import { Module } from '@nestjs/common';
import { CiudadService } from './ciudad.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from './ciudad.entity';

<<<<<<< HEAD

=======
>>>>>>> 375460a (actuliza entidad)
@Module({
    imports: [TypeOrmModule.forFeature([CiudadEntity])],
    controllers: [],
    providers: [CiudadService]
})
<<<<<<< HEAD
export class CiudadModule {}
=======
export class CiudadModule {}
>>>>>>> 375460a (actuliza entidad)
