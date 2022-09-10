import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PaisDto } from './pais.dto';
import { PaisEntity } from './pais.entity';
import { PaisService } from './pais.service';
import { plainToInstance } from 'class-transformer';

@Controller('pais')
@UseInterceptors(BusinessErrorsInterceptor)
export class PaisController {
    constructor(private readonly paisService: PaisService){}
    
    @Get()
    async findAll() {
        await this.paisService.findAll();
    }

    @Get(':paisId')
    async findOne(@Param('paisId') paisId: string){
        return await this.paisService.findOne(paisId);
    }

    @Post()
    async create(@Body() paisDto: PaisDto) {
        const pais: PaisEntity = plainToInstance(PaisEntity, PaisDto);
        return await this.paisService.create(pais);
    }
    
    @Put('paisId')
    async update(@Param(':paisId') paisId: string, @Body() paisDto: PaisDto){
        const pais: PaisEntity = plainToInstance(PaisEntity, PaisDto);
        return await this.paisService.update(paisId, pais);
    }    

    @Delete('paisId')
    async delete(@Param(':paisId') paisId: string){
        return await this.paisService.delete(paisId)
    }
    
}
