import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CiudadEntity } from './ciudad.entity';

<<<<<<< HEAD

=======
>>>>>>> 375460a (actuliza entidad)
@Injectable()
export class CiudadService {
    constructor(
        @InjectRepository(CiudadEntity)
        private readonly ciudadRepository: Repository<CiudadEntity>
      ){}

    async findAll(): Promise<CiudadEntity[]>{
<<<<<<< HEAD
        return await this.ciudadRepository.find({ relations: {restaurantes: true,}});
=======
        return await this.ciudadRepository.find({ relations: {restaurante: true,},});
>>>>>>> 375460a (actuliza entidad)
    }

    async finOne(id: string): Promise<CiudadEntity>{
        const ciudad: CiudadEntity = await this.ciudadRepository.findOne({where: {id}});
        if (!ciudad)
<<<<<<< HEAD
            throw new BusinessLogicException("El Ciudad con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);
=======
            throw new BusinessLogicException("El ciudad con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);
>>>>>>> 375460a (actuliza entidad)

        return ciudad;
    }

<<<<<<< HEAD

=======
 
>>>>>>> 375460a (actuliza entidad)


}
