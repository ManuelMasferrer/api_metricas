import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RegionDto } from './region.dto';
import { RegionEntity } from './region.entity';
import { RegionService } from './region.service';

@Controller('regiones')
@UseInterceptors(BusinessErrorsInterceptor)
export class RegionController {
    constructor(private readonly regionService: RegionService){}
    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(){
        return await this.regionService.findAll();
    }
    @UseGuards(JwtAuthGuard)
    @Get(':regionId')
    async findOne(@Param('regionId') regionId: string){
        return await this.regionService.findOne(regionId);
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() regionDto: RegionDto){
        const region: RegionEntity = plainToInstance(RegionEntity, regionDto);
        return await this.regionService.create(region);
    }
    @UseGuards(JwtAuthGuard)
    @Put(':regionId')
    async update(@Param('regionId') regionId: string, @Body() regionDto: RegionDto){
        const region: RegionEntity = plainToInstance(RegionEntity, regionDto);
        return await this.regionService.update(regionId, region);
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':regionId')
    @HttpCode(204)
    async delete(@Param('regionId') regionId: string){
        return await this.regionService.delete(regionId)
    }


    
}

