import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { RegionEntity } from './region.entity';

@Injectable()
export class RegionService {
    constructor(
        @InjectRepository(RegionEntity)
        private readonly regionRepository: Repository<RegionEntity>
      ){}

    async findAll(): Promise<RegionEntity[]>{
        return await this.regionRepository.find({ relations: {culturagastronomica: true,},});
    }

    async finOne(id: string): Promise<RegionEntity>{
        const region: RegionEntity = await this.regionRepository.findOne({where: {id}});
        if (!region)
            throw new BusinessLogicException("La region con el id no a sido encontrada", BusinessError.NOT_FOUND);

        return region;
    }

    async create(region: RegionEntity): Promise<RegionEntity>{
        return await this.regionRepository.save(region);
    }

    async update(id: string, region: RegionEntity): Promise<RegionEntity>{
        const persistedRegion: RegionEntity = await this.regionRepository.findOne({where:{id}});
        if (!persistedRegion)
            throw new BusinessLogicException("La region con el id no a sido encontrada", BusinessError.NOT_FOUND);
        return await this.regionRepository.save({...persistedRegion, ...region});
    }

    async delete(id: string){
        const region: RegionEntity = await this.regionRepository.findOne({where:{id}});
        if (!region)
            throw new BusinessLogicException("La region gastronomica con el id no a sido encontrada", BusinessError.NOT_FOUND);
        await this.regionRepository.remove(region);
    }
}
