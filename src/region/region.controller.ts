import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RegionDto } from './region.dto';
import { RegionEntity } from './region.entity';
import { RegionService } from './region.service';

@Controller('regiones')
@UseInterceptors(BusinessErrorsInterceptor)
export class RegionController {
    constructor(private readonly regionService: RegionService){}

    @Get()
    async findAll(){
        return await this.regionService.findAll();
    }

    @Get(':regionId')
    async findOne(@Param('regionId') regionId: string){
        return await this.regionService.findOne(regionId);
    }

    @Post()
    async create(@Body() regionDto: RegionDto){
        const region: RegionEntity = plainToInstance(RegionEntity, regionDto);
        return await this.regionService.create(region);
    }

    @Put(':regionId')
    async update(@Param('regionId') regionId: string, @Body() regionDto: RegionDto){
        const region: RegionEntity = plainToInstance(RegionEntity, regionDto);
        return await this.regionService.update(regionId, region);
    }

    @Delete(':regionId')
    @HttpCode(204)
    async delete(@Param('regionId') regionId: string){
        return await this.regionService.delete(regionId)
    }


    
}

