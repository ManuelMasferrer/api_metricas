import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { RegionEntity } from '../region/region.entity';

@Injectable()
export class CulturaRegionService { 
    constructor(
        @InjectRepository(CulturaGastronomicaEntity)
        private readonly culturaRepository: Repository<CulturaGastronomicaEntity>,
    
        @InjectRepository(RegionEntity)
        private readonly regionRepository: Repository<RegionEntity>
    ) {}

    async addCulturaRegion(culturaId: string, regionId: string): Promise<CulturaGastronomicaEntity>{
        const region: RegionEntity = await this.regionRepository.findOne({where: {id: regionId}});
        if (!region)
            throw new BusinessLogicException("La region con id no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const cultura: CulturaGastronomicaEntity = await this.culturaRepository.findOne({where: {id: culturaId}, relations: {region: true,},});
        if (!cultura)
            throw new BusinessLogicException("La cultura con id no ha sido encontrada", BusinessError.NOT_FOUND);
        cultura.region = region
        return await this.culturaRepository.save({...cultura});
    }

    async findRegionPorCulturaId(culturaId: string): Promise<RegionEntity>{
        const cultura: CulturaGastronomicaEntity = await this.culturaRepository.findOne({where: {id: culturaId}, relations: {region: true,},});
        if (!cultura)
            throw new BusinessLogicException("La cultura con id no ha sido encontrada", BusinessError.NOT_FOUND);
        
        return cultura.region;
    }  

    async findCulturaPorRegionId(regionId: string): Promise<CulturaGastronomicaEntity>{
        const region: RegionEntity = await this.regionRepository.findOne({where: {id: regionId}});
        if (!region)
            throw new BusinessLogicException("La region id no ha sido encontrada", BusinessError.NOT_FOUND);    
        return region.culturagastronomica;
    }

}
