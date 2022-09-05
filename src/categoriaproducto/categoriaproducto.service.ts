import { Injectable } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaproductoEntity } from './categoriaproducto.entity';
import { faker } from '@faker-js/faker';
import { RegionEntity } from '../region/region.entity';
import { BusinessLogicException } from 'src/shared/errors/business-errors';


@Injectable()
export class CategoriaproductoService {

    constructor(
        @InjectRepository(CategoriaproductoEntity)
        private readonly categoriaRepository: Repository<CategoriaproductoEntity>
    ){}

//     async findAll(): Promise<CategoriaproductoEntity[]>{
//         return await this.culturaRepository.find({ relations: {region: true,},});
//     }

//     async findOne(id: string): Promise<CategoriaproductoEntity>{
//         const cultura: CategoriaproductoEntity = await this.culturaRepository.findOne({where: {id}, relations: {region: true,},});
//         if (!cultura)
//             throw new BusinessLogicException("La cultura gastronomica con el id no a sido encontrada", BusinessError.NOT_FOUND);

//         return cultura;
//     }

//     async create(cultura: CategoriaproductoEntity): Promise<CategoriaproductoEntity>{
//         return await this.culturaRepository.save(cultura);
//     }

//     async update(id: string, cultura: CategoriaproductoEntity): Promise<CategoriaproductoEntity>{
//         const persistedCultura: CategoriaproductoEntity = await this.culturaRepository.findOne({where:{id}});
//         if (!persistedCultura)
//             throw new BusinessLogicException("La cultura gastronomica con el id no a sido encontrada", BusinessError.NOT_FOUND);
//         return await this.culturaRepository.save({...persistedCultura, ...cultura});
//     }

//     async delete(id: string){
//         const cultura: CategoriaproductoEntity = await this.culturaRepository.findOne({where:{id}});
//         if (!cultura)
//             throw new BusinessLogicException("La cultura gastronomica con el id no a sido encontrada", BusinessError.NOT_FOUND);
//         await this.culturaRepository.remove(cultura);
//     }
}