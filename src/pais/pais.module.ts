import { Module } from '@nestjs/common';
import { PaisController } from './pais.controller';
import { PaisService } from './pais.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaisEntity } from './pais.entity';

@Module({
<<<<<<< HEAD
  imports: [TypeOrmModule.forFeature([PaisEntity])],
  controllers: [PaisController], 
  providers: [PaisService,]
})
=======
    imports: [],
    controllers: [],
    providers: [],
  })
>>>>>>> ee351af (Entities ciudad, categoria)
export class PaisModule {}
