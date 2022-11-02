import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { RestauranteDto } from '../restaurante/restaurante.dto';
import { RestauranteEntity } from '../restaurante/restaurante.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaRestauranteService } from './cultura-restaurante.service';

@Controller('cultura-restaurante')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaRestauranteController {
    constructor(private readonly culturaRestauranteService: CulturaRestauranteService){}

    @Get(':culturaId/restaurantes/:restauranteId')
    async findRestauranteByCulturaIdAProductoId(@Param('culturaId') culturaId: string, @Param('restauranteId') restauranteId: string){
       return this.culturaRestauranteService.findRestauranteByCulturaIdRestauranteId(culturaId, restauranteId);
    }

    @Get(':culturaId/restaurantes')
    async findRestaurantesFromCultura(@Param('culturaId') culturaId: string){
       return this.culturaRestauranteService.findRestaurantesByCulturaId(culturaId);
    }

    @Post(':culturaId/restaurantes/:restauranteId')
    async addRestaurantetoCultura(@Param('culturaId') culturaId: string, @Param('restauranteId') restauranteId: string){
       return this.culturaRestauranteService.addRestauranteCultura(culturaId, restauranteId);
    }

    @Put(':culturaId/restaurantes')
    async associateProductosCultura(@Body() restaurantesDto: RestauranteDto[], @Param('culturaId') culturaId: string){
       const restaurantes = plainToInstance(RestauranteEntity, restaurantesDto)
       return this.culturaRestauranteService.associateRestauranteCultura(culturaId, restaurantes);
    }


    @Delete(':culturaId/restaurantes/:restauranteId')
    @HttpCode(204)
    async deleteArtworkMuseum(@Param('culturaId') culturaId: string, @Param('restauranteId') restauranteId: string){
       return this.culturaRestauranteService.deleteRestauranteToCultura(culturaId, restauranteId);
    }
}
