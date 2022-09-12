import { Controller, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaPaisService } from './cultura-pais.service';

@Controller('cultura-pais')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaPaisController {
    constructor(private readonly culturaPaisService: CulturaPaisService){}

    @Post(':culturaId/paises/:paisId')
    async addCulturaGastronomicaToPais(@Param('culturaId') culturaId: string, @Param('paisId') paisId:string){
        return await this.culturaPaisService.addCulturaGastronomicaPais(culturaId, paisId);
    }

    @Get(':culturaId/paises')
    async findPaisesByCulturaId(@Param('culturaId') culturaId: string){
        return await this.culturaPaisService.findPaisesByCulturaId(culturaId);
    }

    @Get(':culturaId/paises/:paisId')
    async findPaisByCulturaId(@Param('culturaId') culturaId: string, @Param('paisId') paisId:string){
        return await this.culturaPaisService.findPaisbyCulturaId(paisId, culturaId)
    }
}
