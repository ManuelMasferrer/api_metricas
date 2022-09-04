import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CulturaGastronomicaEntity } from '../culturagastronomica/culturagastronomica.entity';
import { Repository } from 'typeorm';
import { RecetaEntity } from '../receta/receta.entity';
import { BusinessLogicException, BusinessError } from '../shared/errors/business-errors';

@Injectable()
export class CulturaRecetaService {
    constructor(
        @InjectRepository(CulturaGastronomicaEntity)
        private readonly culturaGastronomicaRepository: Repository<CulturaGastronomicaEntity>,

        @InjectRepository(RecetaEntity)
        private readonly recetaRepository: Repository<RecetaEntity>
    ) {}

    async addRecetaCultura(culturaId: string, recetaId: string): Promise<CulturaGastronomicaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}});
        if (!receta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const culturagastronomica: CulturaGastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaId}, relations: ["region", "recetas", "paises"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
         
        culturagastronomica.recetas = [...culturagastronomica.recetas, receta];
        return await this.culturaGastronomicaRepository.save(culturagastronomica)
   

    }

    async findRecetaByCulturaIdRecetaId(culturaId: string, recetaId: string): Promise<RecetaEntity> {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}})
        if (!receta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const culturagastronomica: CulturaGastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaId}, relations: ["recetas"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const culturaReceta: RecetaEntity = culturagastronomica.recetas.find(e => e.id === receta.id)

        if(!culturaReceta)
            throw new BusinessLogicException("La receta con el id proporcionado no esta asociada a la cultura gastronomica", BusinessError.PRECONDITION_FAILED)
        
        return culturaReceta;    
   
    }   
    
    async findRecetasByCulturaId(culturaId: string): Promise<RecetaEntity[]> {
        const culturagastronomica: CulturaGastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaId}, relations: ["recetas"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        return culturagastronomica.recetas;
    }

    async associateRecetaCultura(culturaId: string, recetas: RecetaEntity[]): Promise<CulturaGastronomicaEntity> {
        const culturagastronomica: CulturaGastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaId}, relations: ["recetas"]});
        
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        for (let i = 0; i <  recetas.length; i++) {
            const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetas[i].id}})
            if (!receta)
                throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        }
        
        culturagastronomica.recetas = recetas;
        return await this.culturaGastronomicaRepository.save(culturagastronomica);    
    }

    async deleteRecetaToCultura(culturaId: string, recetaId: string) {
        const receta: RecetaEntity = await this.recetaRepository.findOne({where: {id: recetaId}})
        if (!receta)
            throw new BusinessLogicException("La receta con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const culturagastronomica: CulturaGastronomicaEntity = await this.culturaGastronomicaRepository.findOne({where: {id: culturaId}, relations: ["recetas"]});
        if (!culturagastronomica)
            throw new BusinessLogicException("La cultura gastronomica con el id proporcionado no ha sido encontrada", BusinessError.NOT_FOUND);
        
        const culturaReceta: RecetaEntity = culturagastronomica.recetas.find(e => e.id === receta.id)

        if(!culturaReceta)
            throw new BusinessLogicException("La receta con el id proporcionado no esta asociada a la cultura gastronomica", BusinessError.PRECONDITION_FAILED)
        
        culturagastronomica.recetas = culturagastronomica.recetas.filter(e => e.id !== recetaId )
        await this.culturaGastronomicaRepository.save(culturagastronomica)    
    }
}
