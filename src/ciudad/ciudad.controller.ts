

import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadDto } from './ciudad.dto';
import { CiudadEntity } from './ciudad.entity';
import { CiudadService } from './ciudad.service';
import { plainToInstance } from 'class-transformer';


@Controller('ciudad')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadController {
    constructor(private readonly ciudadService: CiudadService) {}

    @Get()
    async findAll() {
        await this.ciudadService.findAll();
    }

    @Get(':CiudadId')
    async findOne(@Param('CiudadId') CiudadId: string){
        return await this.ciudadService.findOne(CiudadId);
    }

}


