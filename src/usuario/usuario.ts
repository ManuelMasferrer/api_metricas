export class Usuario {
    id: number;
    nombre: string;
    contrasena: string;
    roles: string[];

    constructor(id: number, nombre: string, contrasena: string, roles: string[]){
        this.id = id;
        this.nombre = nombre;
        this.contrasena = contrasena;
        this.roles = this.roles;
    }
}
