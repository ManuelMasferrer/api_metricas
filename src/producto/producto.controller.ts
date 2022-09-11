import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ProductoDto } from './producto.dto';
import { ProductoEntity } from './producto.entity';
import { plainToInstance } from 'class-transformer';

@Controller('producto')
@UseInterceptors(BusinessErrorsInterceptor)
export class ProductoController {
    constructor(private readonly productoService: ProductoService){}

    @Get()
    async findAll() {
      return this.productoService.findAll();
    }
    @Get(':productoId')
    async findOne(@Param('productoId') productoId: string) {
        return this.productoService.findOne(productoId);
    }

    @Post()
    async create(@Body() productoDto: ProductoDto) {
        const producto: ProductoEntity = plainToInstance(ProductoEntity, productoDto);
        return this.productoService.create(producto);
    }

    @Put(':productoId')
    async update(@Param('productoId') productoId: string, @Body() productoDto: ProductoDto) {
        const producto: ProductoEntity = plainToInstance(ProductoEntity, productoDto);
        return this.productoService.update(productoId, producto);
    }

    @Delete(':productoId')
    @HttpCode(204)
    async delete(@Param('productoId') productoId: string) {
        return this.productoService.delete(productoId);
    }


}
