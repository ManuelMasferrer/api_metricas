import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PaisDto } from './pais.dto';
import { PaisEntity } from './pais.entity';
import { PaisService } from './pais.service';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../usuario/roles.decorator';
import { Role } from '../usuario/role.enum';

@Controller('paises')
@UseInterceptors(BusinessErrorsInterceptor)
export class PaisController {
    constructor(private readonly paisService: PaisService){}
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @HasRoles(Role.Lector, Role.Admin)
    async findAll() {
        return await this.paisService.findAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':paisId')
    @HasRoles(Role.Lector, Role.Admin)
    async findOne(@Param('paisId') paisId: string){
        return await this.paisService.findOne(paisId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    @HasRoles(Role.Editor, Role.Admin)
    async create(@Body() paisDto: PaisDto) {
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.create(pais);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':paisId')
    @HasRoles(Role.Editor, Role.Admin)
    async update(@Param('paisId') paisId: string, @Body() paisDto: PaisDto){
        const pais: PaisEntity = plainToInstance(PaisEntity, paisDto);
        return await this.paisService.update(paisId, pais);
    }    

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':paisId')
    @HasRoles(Role.Borrar, Role.Admin)
    @HttpCode(204)
    async delete(@Param('paisId') paisId: string){
        return await this.paisService.delete(paisId)
    }
    
}
