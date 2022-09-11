import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RecetaService } from './receta.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RecetaDto } from './receta.dto';
import { RecetaEntity } from './receta.entity';
import { plainToInstance } from 'class-transformer';

@Controller('receta')
@UseInterceptors(BusinessErrorsInterceptor)
export class RecetaController {
    constructor(private readonly recetaService: RecetaService){}

    @Get()
    async findAll() {
        await this.recetaService.findAll();
    }

    @Get(':recetaId')
    async findOne(@Param('recetaId') recetaId: string){
        await this.recetaService.findOne(recetaId);
    }

    @Post()
    async create(@Body() recetaDto: RecetaDto){
        const receta: RecetaEntity = plainToInstance(RecetaEntity, RecetaDto);
        return await this.recetaService.create(receta);
    }

    @Put(':recetaId')
    async update(@Param('recetaId') recetaId: string,  @Body() recetaDto: RecetaDto) {
        const receta: RecetaEntity = plainToInstance(RecetaEntity, RecetaDto);
        return await this.recetaService.update(recetaId, receta);
    }

    @Delete(':recetaId')
    @HttpCode(204)
    async delete(@Param('recetaId') recetaId: string){
        return await this.recetaService.delete(recetaId)
    }
    

}
