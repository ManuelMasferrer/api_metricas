import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { CulturagastronomicaDto } from './culturagastronomica.dto';
import { CulturaGastronomicaEntity } from './culturagastronomica.entity';
import { CulturagastronomicaService } from './culturagastronomica.service';

@Controller('culturasgastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturagastronomicaController {
    constructor(private readonly culturaService: CulturagastronomicaService){}
    
    @Get()
    async findAll(){
        return await this.culturaService.findAll();
    }

    @Get(':culturaId')
    async findOne(@Param('culturaId') culturaId: string){
        return await this.culturaService.finOne(culturaId);
    }
    
    @Post()
    async create(@Body() culturaDto: CulturagastronomicaDto){
        const cultura: CulturaGastronomicaEntity = plainToInstance(CulturaGastronomicaEntity, culturaDto);
        return await this.culturaService.create(cultura);
        
    }

    @Put(':culturaId')
    async update(@Param('culturaId') culturaId: string, @Body() culturaDto: CulturagastronomicaDto){
        const cultura: CulturaGastronomicaEntity = plainToInstance(CulturaGastronomicaEntity, culturaDto);
        return await this.culturaService.update(culturaId, cultura);
    }

    @Delete(':regionId')
    @HttpCode(204)
    async delete(@Param('regionId') regionId: string){
        return await this.culturaService.delete(regionId)
    }
}
