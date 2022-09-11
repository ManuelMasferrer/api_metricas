import { Controller } from '@nestjs/common';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './producto.entity';

import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CategoraproductoDto } from './categoriaproducto.dto';
import { CategoriaproductoEntity } from './categoriaproducto.entity';

import { plainToInstance } from 'class-transformer';


@Controller('categoriaproducto')
@UseInterceptors(BusinessErrorsInterceptor)
export class CategoriaproductoController {
    constructor(private readonly categoriaProductoService: CategoriaProductoService){}
        
    @Get()
    async findAll() {
      return this.categoriaProductoService.findAll();
    }
    @Get(':categoriaId')
    async findOne(@Param('categoriaId') categoriaId: string) {
        return this.categoriaProductoService.findOne(categoriaId);
    }

    @Post()
    async create(@Body() CategoriaProductoDto: CategoriaProductoDto) {
        const producto: categoriaproductoEntity = plainToInstance(categoriaproductoEntity, CategoriaProductoDto);
        return this.categoriaProductoService.create(producto);
    }

    @Put(':categoriaId')
    async update(@Param('categoriaId') categoriaId: string, @Body() CategoriaProductoDto: CategoriaProductoDto) {
        const producto: categoriaproductoEntity = plainToInstance(categoriaproductoEntity, CategoriaProductoDto);
        return this.categoriaProductoService.update(categoriaId, producto);
    }

    @Delete(':categoriaId')
    @HttpCode(204)
    async delete(@Param('categoriaId') categoriaId: string) {
        return this.categoriaProductoService.delete(categoriaId);
    }
   
  
}

