
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
}