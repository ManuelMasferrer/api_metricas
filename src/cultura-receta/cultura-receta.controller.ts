import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RecetaDto } from 'src/receta/receta.dto';
import { RecetaEntity } from '../receta/receta.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaRecetaService } from './cultura-receta.service';
import { plainToInstance } from 'class-transformer';

@Controller('cultura-receta')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaRecetaController {
    constructor(private readonly culturaRecetaService: CulturaRecetaService){}

    @Get(':culturaId/recetas')
    async findRecetasFromCultura(@Param('culturaId') culturaId: string){
        return await this.culturaRecetaService.findRecetasFromCultura(culturaId);
    }

    @Get(':culturaId/recetaId')
    async findRecetaFromCultura(@Param('culturaId') culturaId: string, @Param('recetaId') recetaId: string){
        return await this.culturaRecetaService.findRecetaFromCultura(culturaId, recetaId);
    }

    @Get(':recetaId/cultura')
    async findCulturaFromReceta(@Param('recetaId') recetaId: string){
        return await this.culturaRecetaService.findCulturaFromReceta(recetaId);
    }

    @Post(':culturaId/recetas/recetaId')
    async addRecetaToCultura(@Param('culturaId') culturaId: string, @Param('recetaId') recetaId: string){
        return await this.culturaRecetaService.addRecetaToCultura(culturaId, recetaId);
    }

    @Put(':culturaId/recetas')
    async associateRecetaToCultura(@Param('culturaId') culturaId: string, @Body() recetaDto: RecetaDto){
        const receta: RecetaEntity = plainToInstance(RecetaEntity, RecetaDto);
        return await this.culturaRecetaService.associateRecetaCultura(culturaId, receta);
    }

    @Delete(':culturaId/recetaId')
    @HttpCode(204)
    async deleteRecetaFromCultura(@Param('culturaId') culturaId: string, @Param('recetaId') recetaId: string){
        return await this.culturaRecetaService.deleteRecetaToCultura(culturaId, recetaId);
    }


}
