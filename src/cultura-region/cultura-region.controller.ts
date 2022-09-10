import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { RegionDto } from '../region/region.dto';
import { RegionEntity } from '../region/region.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaRegionService } from './cultura-region.service';
import { plainToInstance } from 'class-transformer';

@Controller('culturasgastronomicas')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaRegionController {
    constructor(private readonly culturaRegionService: CulturaRegionService){}

    @Post(':culturaId/regiones/:regionId')
    async addCulturaRegion(@Param('culturaId') culturaId: string, @Param('regionId') regionId: string){
      return await this.culturaRegionService.addCulturaRegion(culturaId, regionId);  
    }

    @Get(':culturaId/regiones')
    async findRegionPorCulturaId(@Param('culturaId') culturaId: string){
        return await this.culturaRegionService.findRegionPorCulturaId(culturaId)
    }

    @Get('/regiones/:regionId')
    async findCulturaPorRegionId(@Param('regionId') regionId: string){
        return await this.culturaRegionService.findCulturaPorRegionId(regionId)
    }

    @Put(':culturaId/regiones')
    async asociarRegionCulturaId(@Param('culturaId') culturaId: string, @Body() regionDto: RegionDto){
        const region: RegionEntity = plainToInstance(RegionEntity, regionDto)
        return await this.culturaRegionService.associateRegionaCulturaId(culturaId, region);
    }

    @Delete(':culturaId/regiones/:regionId')
    @HttpCode(204)
    async deleteRegionCultura(@Param('culturaId') culturaId: string, @Param('regionId') regionId: string){
        return await this.culturaRegionService.deleteRegionIdCulturaId(culturaId, regionId);
    }
 
}
