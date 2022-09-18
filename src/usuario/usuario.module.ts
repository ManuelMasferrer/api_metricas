import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';


@Module({
    controllers: [UsuarioController],
    providers: [UsuarioService, AuthService, JwtService],
    exports: [UsuarioService],
})
export class UsuarioModule { }
