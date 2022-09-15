import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PaisDto } from 'src/pais/pais.dto';
import { PaisEntity } from 'src/pais/pais.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PaisCulturaService } from './pais-cultura.service';

@Controller('culturasgastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
export class PaisCulturaController {
    constructor(private readonly paisCulturaService: PaisCulturaService){}

    @Post(":culturaId/paises/:paisId")
    async addPaisToCultura(@Param('culturaId') culturaId: string, @Param('paisId') paisId: string){
        return this.paisCulturaService.addPaisToCultura(culturaId, paisId)
    }
        
    @Get(':culturaId/paises')
    async findPaisesFromCultura(@Param('culturaId') culturaId: string){
        return this.paisCulturaService.findPaisesFromCultura(culturaId);
    }

    @Get(':culturaId/paises/:paisId')
    async findPaisFromCultura(@Param('culturaId') culturaId: string, @Param('paisId') paisId: string){
        return this.paisCulturaService.findPaisFromCultura(culturaId, paisId);
    }

    @Put(':culturaId/paises')
    async associateRecetaToCultura(@Param('culturaId') culturaId: string, @Body() paisDto: PaisDto){
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisCulturaService.updateCulturasPais(culturaId, pais);
    }

    @Delete(':culturaId/paises/:paisId')
    @HttpCode(204)
    async deleteRecetaFromCultura(@Param('culturaId') culturaId: string, @Param('paisId') paisId: string){
        return await this.paisCulturaService.deletePaisFromCultura(culturaId, paisId);
    }



}
