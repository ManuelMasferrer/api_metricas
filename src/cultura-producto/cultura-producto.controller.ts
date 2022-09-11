import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductoDto } from 'src/producto/producto.dto';
import { ProductoEntity } from 'src/producto/producto.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaProductoService } from './cultura-producto.service';

@Controller('cultura-producto')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaProductoController {
    constructor(private readonly culturaProductoService: CulturaProductoService){}

    @Post(':culturaId/productos/:productoId')
    async addProductoCultura(@Param('culturaId') culturaId: string, @Param('productoId') productoId: string): Promise<any>{
       return this.culturaProductoService.addProductoCultura(culturaId, productoId);
    }
    @Get(':culturaId/productos/:productoId')
    async findProductoByCulturaIdAProductoId(@Param('culturaId') culturaId: string, @Param('productoId') productoId: string){
       return this.culturaProductoService.findProductoByCulturaIdProductoId(culturaId, productoId);
    }

    @Get(':culturaId/productos')
    async findProductosFromCultura(@Param('culturaId') culturaId: string){
       return this.culturaProductoService.findProductosByCulturaId(culturaId);
    }

    @Put(':culturaId/productos')
    async associateProductosCultura(@Body() productosDto: ProductoDto[], @Param('culturaId') culturaId: string){
       const productos = plainToInstance(ProductoEntity, productosDto)
       return this.culturaProductoService.associateProductoCultura(culturaId, productos);
    }

    @Delete(':culturaId/productos/:productoId')
    @HttpCode(204)
    async deleteArtworkMuseum(@Param('culturaId') culturaId: string, @Param('productoId') productoId: string){
       return this.culturaProductoService.deleteProductoToCultura(culturaId, productoId);
    }


}
