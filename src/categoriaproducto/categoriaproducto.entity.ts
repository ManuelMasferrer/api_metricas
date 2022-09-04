// import { Producto } from '../producto/producto.entity';

import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';

@Entity()
export class CategoriaproductoEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nombre: string;
   
    @ManyToOne(() => CategoriaproductoEntity, Producto => Producto.categoria )
    categoriaproducto: catetoriaproducto.Entity;
    
}
