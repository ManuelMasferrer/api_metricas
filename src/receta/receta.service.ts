import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaEntity } from './receta.entity';

@Injectable()
export class RecetaService {
    constructor(
        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>
    ){}

    async findAll(): Promise<RecetaEntity[]> {
        return await this.recetaRepository.find({relations: {culturagastronomica: true}})
    }


}
