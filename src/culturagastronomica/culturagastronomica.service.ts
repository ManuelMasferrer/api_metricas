import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from './culturagastronomica.entity';

@Injectable()
export class CulturagastronomicaService {
    constructor(
        @InjectRepository(CulturaGastronomicaEntity)
        private readonly culturaRepository: Repository<CulturaGastronomicaEntity>
      ){}

    async findAll(): Promise<CulturaGastronomicaEntity[]>{
        return await this.culturaRepository.find({ relations: {region: true,},});
    }

    async finOne(id: string): Promise<CulturaGastronomicaEntity>{
        const cultura: CulturaGastronomicaEntity = await this.culturaRepository.findOne({where: {id}, relations: {region: true,},});
        if (!cultura)
            throw new BusinessLogicException("La cultura gastronomica con el id no a sido encontrada", BusinessError.NOT_FOUND);

        return cultura;
    }

    async create(cultura: CulturaGastronomicaEntity): Promise<CulturaGastronomicaEntity>{
        return await this.culturaRepository.save(cultura);
    }

    async update(id: string, cultura: CulturaGastronomicaEntity): Promise<CulturaGastronomicaEntity>{
        const persistedCultura: CulturaGastronomicaEntity = await this.culturaRepository.findOne({where:{id}});
        if (!persistedCultura)
            throw new BusinessLogicException("La cultura gastronomica con el id no a sido encontrada", BusinessError.NOT_FOUND);
        return await this.culturaRepository.save({...persistedCultura, ...cultura});
    }

    async delete(id: string){
        const cultura: CulturaGastronomicaEntity = await this.culturaRepository.findOne({where:{id}});
        if (!cultura)
            throw new BusinessLogicException("La cultura gastronomica con el id no a sido encontrada", BusinessError.NOT_FOUND);
        await this.culturaRepository.remove(cultura);
    }
}
