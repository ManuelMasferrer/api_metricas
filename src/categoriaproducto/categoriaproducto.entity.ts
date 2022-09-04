

// import { Producto } from '../producto/producto.entity';

import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoriaproductoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
   
    // @ManyToOne(() => CategoriaproductoEntity, Producto => Producto.categoria )
    // categoriaproducto: catetoriaproducto.Entity;
}
