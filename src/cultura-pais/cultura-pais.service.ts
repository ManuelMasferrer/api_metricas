import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { PaisEntity } from '../pais/pais.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class CulturaPaisService {
    constructor(
        @InjectRepository(CulturaGastronomicaEntity)
        private readonly culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>,

        @InjectRepository(PaisEntity)
        private readonly paisRepository: Repository<PaisEntity>
    ){}

    async addCulturaGastronomicaPais(culturaId: string, paisId: string): Promise<CulturaGastronomicaEntity> {
        const pais = await this.paisRepository.findOne({where: {id: paisId} });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND)
        
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId}, relations: ["paises"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        culturagastronomica.paises = [...culturagastronomica.paises, pais]
        return await this.culturaGastronomicaRepository.save(culturagastronomica)
    }

    async findPaisbyCulturaId(paisId: string, culturaId: string): Promise<PaisEntity> {
        const pais = await this.paisRepository.findOne({where: {id: paisId} });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND)
        
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId}, relations: ["paises"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const culturaPais = culturagastronomica.paises.find(e => e.id === pais.id);
        if (!culturaPais)
            throw new BusinessLogicException("El pais con el id proporcionado no esta asociado a la cultura gastronomica", BusinessError.NOT_FOUND)
        
            return culturaPais;    
    }

    async findPaisesByCulturaId(culturaId: string): Promise<PaisEntity[]> {
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId}, relations: ["paises"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        return culturagastronomica.paises;
    }

    async associateCulturaPais(culturaId: string, paisToAdd: PaisEntity): Promise<CulturaGastronomicaEntity> {
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId}, relations: ["paises"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);  
        const paises: PaisEntity[] = culturagastronomica.paises;
        for (let i = 0; i < paises.length; i++){
            const pais: PaisEntity = await this.paisRepository.findOne({where: {id: paisToAdd.id}})
            if (!pais)
                throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND);
            }
        
        culturagastronomica.paises.push(paisToAdd);
        return await this.culturaGastronomicaRepository.save(culturagastronomica);
        
    }

    async deletePaisToCultura(paisId: string, culturaId: string): Promise<CulturaGastronomicaEntity> {
        const pais = await this.paisRepository.findOne({where: {id: paisId} });
        if (!pais)
            throw new BusinessLogicException("El pais con el id proporcionado no ha sido encontrado", BusinessError.NOT_FOUND)
        
        const culturagastronomica = await this.culturaGastronomicaRepository.findOne({where:{id: culturaId}, relations: ["paises"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        culturagastronomica.paises = culturagastronomica.paises.filter(e => e.id !== paisId);
        
        return await this.culturaGastronomicaRepository.save(culturagastronomica);
    }
}

