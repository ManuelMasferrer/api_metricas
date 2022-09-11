import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RecetaEntity } from '../receta/receta.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CulturaRecetaService } from './cultura-receta.service';

@Controller('cultura-receta')
@UseInterceptors(BusinessErrorsInterceptor)
export class CulturaRecetaController {
    constructor(private readonly culturaRecetaService: CulturaRecetaService){}

    @Get(':culturaId/recetas')
    async findRecetasByCultura(culturaId: string): Promise<RecetaEntity[]>{
        return 
    }
}
