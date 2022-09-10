<<<<<<< HEAD
import { ProductoEntity } from '../producto/producto.entity';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

=======
// import { Producto } from '../producto/producto.entity';

import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
>>>>>>> ee351af (Entities ciudad, categoria)

@Entity()
export class CategoriaproductoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
   
<<<<<<< HEAD
    @OneToMany(() => ProductoEntity, producto => producto.categoria )
    productos: ProductoEntity[];

}
=======
    // @ManyToOne(() => CategoriaproductoEntity, Producto => Producto.categoria )
    // categoriaproducto: catetoriaproducto.Entity;
}
    
>>>>>>> ee351af (Entities ciudad, categoria)
