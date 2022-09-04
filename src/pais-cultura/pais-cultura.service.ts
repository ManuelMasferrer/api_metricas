import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { PaisEntity } from '../pais/pais.entity';

@Injectable()
export class PaisCulturaService {
    constructor(
        @InjectRepository(PaisEntity)
        private readonly paisRepository: Repository<PaisEntity>,

        @InjectRepository(CulturaGastronomicaEntity)
        private readonly culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>
    ){}

    async addCulturaToPais(paisId: string, culturaId: string): Promise<PaisEntity> {
        const pais = await this.paisRepository.findOne({where: {id: paisId}, relations: ["culturasgastronomicas"] });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND)
        
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId}, relations: ["paises"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        pais.culturasgastronomicas = [...pais.culturasgastronomicas, culturagastronomica];
        return await this.paisRepository.save(pais);
    }

    async findCulturaByPais(culturaId: string, paisId: string): Promise<CulturaGastronomicaEntity> {
        const pais = await this.paisRepository.findOne({where: {id: paisId}, relations: ["culturasgastronomicas"] });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND)
        
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId},});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);

        const paisCultura = pais.culturasgastronomicas.find(e => e.id === culturagastronomica.id);

        if (!paisCultura)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no esta asociada al pais", BusinessError.NOT_FOUND)
        
        return paisCultura;     
    }

    async findCulturasByPais(paisId: string): Promise<CulturaGastronomicaEntity[]> {
        const pais = await this.paisRepository.findOne({where: {id: paisId}, relations:["culturasgastronomicas"] });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND)
        
        return pais.culturasgastronomicas;
    }

    async updateCulturasFromPais(paisId: string, culturasgastronomicas: CulturaGastronomicaEntity[]): Promise<PaisEntity> {
        const pais = await this.paisRepository.findOne({where: {id: paisId}, relations:["culturasgastronomicas"] });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);
        
        for(let culturaEntity of culturasgastronomicas) {
            const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaEntity.id}});
            if (!culturagastronomica)
                throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);

        pais.culturasgastronomicas = culturasgastronomicas;
        return await this.paisRepository.save(pais);
        }
    }

    async deleteCulturaFromPais(culturaId: string, paisId: string) {
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId},});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const pais = await this.paisRepository.findOne({where: {id: paisId}, relations:["culturasgastronomicas"] });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);
         
        pais.culturasgastronomicas = pais.culturasgastronomicas.filter(e => e.id !== culturaId)
        await this.paisRepository.save(pais);
    }

    





}
