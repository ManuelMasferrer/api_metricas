import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecetaEntity } from './receta.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { RecetaDto} from './receta.dto'

@Injectable()
export class RecetaService {
    constructor(
        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>
    ){}

    async findAll(): Promise<RecetaDto[]> {
        return await this.recetaRepository.find({relations: {culturagastronomica: true}})
    }

    async findOne(id: string): Promise<RecetaDto> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id}, relations: {culturagastronomica: true,},})
        if(!receta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        return receta;
    }

    async create(recetaDto: RecetaDto): Promise<RecetaDto> {
        return await this.recetaRepository.save(recetaDto);
    }

    async update(id: string, receta: RecetaDto): Promise<RecetaDto> {
        const persistedReceta: RecetaDto = await this.recetaRepository.findOne({where: {id}});
        if(!persistedReceta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada.", BusinessError.NOT_FOUND)
        return await this.recetaRepository.save({...persistedReceta, ...receta});
    }

    async delete(id: string) {
        const receta = await this.recetaRepository.findOne({where: {id}});
        if(!receta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        else {
            return await this.recetaRepository.remove(receta);
        }
    }
}