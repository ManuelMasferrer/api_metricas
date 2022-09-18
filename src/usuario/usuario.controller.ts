import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { AuthService } from '../auth/auth.service';



@Controller('usuarios')
export class UsuarioController {
    constructor(private readonly authService: AuthService){}
    @UseGuards(LocalAuthGuard)
    @Post('autenticador')
    async autenticar(@Request() req){
        return this.authService.login(req);
    }
}
