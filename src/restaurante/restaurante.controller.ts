import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { RestauranteDto } from './restaurante.dto';
import { RestauranteEntity } from './restaurante.entity';
import { RestauranteService } from './restaurante.service';

@Controller('restaurante')
@UseInterceptors(BusinessErrorsInterceptor)
export class RestauranteController {
    constructor(private readonly restauranteService: RestauranteService) {}

    @Get()
    async findAll() {
      return this.restauranteService.findAll();
    }
    @Get(':restauranteId')
    async findOne(@Param('restauranteId') restauranteId: string) {
        return this.restauranteService.findOne(restauranteId);
    }

    
    @Post()
    async create(@Body() restauranteDto: RestauranteDto) {
        const restaurante: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return this.restauranteService.create(restaurante);
    }

    @Put(':restauranteId')
    async update(@Param('restauranteId') restauranteId: string, @Body() restauranteDto: RestauranteDto) {
        const restaurante: RestauranteEntity = plainToInstance(RestauranteEntity, restauranteDto);
        return this.restauranteService.update(restauranteId, restaurante);
    }

    @Delete(':restauranteId')
    @HttpCode(204)
    async delete(@Param('restauranteId') restauranteId: string) {
        return this.restauranteService.delete(restauranteId);
    }


}
